import {
  Ability,
  MoveEntry,
  TargetContext,
  TraditionalBBP as T,
  effectAction,
  permanent,
  TargetEffectsReciept,
} from "../mod.ts";

const DAMAGE_FACTOR = 4; // 1/4 of max HP

export const Aftermath: Ability = {
  name: "Aftermath",
  description: "Damages attacking Pokémon for 1/4 of their max HP if this Pokémon faints from a contact move.",
  slot: "ability",

  apply: ({ self }) => {
    function damageAttackerOnFaint(reciept: TargetEffectsReciept<T>, context: TargetContext<T>) {
      const { action, battle } = context;
      if (context.target !== self) return;
      if (!(action.params.source instanceof MoveEntry)) return;
      if (!action.params.source.effects.makesContact) return;

      // TODO this needs to be better
      const faintFromAttack = reciept.attack.success && reciept.attack.faint;
      const faintFromFaint = reciept.faint.success && reciept.faint.actual;
      const faintFromHP = reciept.hp.success && reciept.hp.faint;
      if (!(faintFromAttack || faintFromFaint || faintFromHP)) return;
      // if (context.battle.somePokemonHasAbility("Damp")) return; TODO

      action.reactions.add(
        effectAction({
          battle,
          targets: [action.params.source.user],
          user: self,
          parent: action,
          effect: {
            recoil: { hp: -Math.floor(action.params.source.user.stats.hp.max / DAMAGE_FACTOR) },
          },
        })
      );
    }

    return {
      name: Aftermath.name,
      activate: () => self.on("effectReciept", damageAttackerOnFaint),
      deactivate: () => self.off("effectReciept", damageAttackerOnFaint),
      expiry: permanent,
    };
  },
};
