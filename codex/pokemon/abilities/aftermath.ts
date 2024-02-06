import {
  Ability,
  MoveEntry,
  TargetContext,
  TraditionalBBP as T,
  effectAction,
  permanent,
  TargetEffectsReceipt,
} from "../mod.ts";

const DAMAGE_FACTOR = 4; // 1/4 of max HP

export const Aftermath: Ability = {
  name: "Aftermath",
  description: "Damages attacking Pokémon for 1/4 of their max HP if this Pokémon faints from a contact move.",
  slot: "ability",

  apply: ({ self }) => {
    function damageAttackerOnFaint(receipt: TargetEffectsReceipt<T>, { action, battle, source }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (!source.effects.makesContact) return;

      // TODO this needs to be better
      const faintFromAttack = receipt.attack.success && receipt.attack.faint;
      const faintFromFaint = receipt.faint.success && receipt.faint.actual;
      const faintFromHP = receipt.hp.success && receipt.hp.faint;
      if (!(faintFromAttack || faintFromFaint || faintFromHP)) return;
      // if (context.battle.somePokemonHasAbility("Damp")) return; TODO

      action.reactions.add(
        effectAction({
          battle,
          targets: [source.user],
          user: self,
          parent: action,
          effect: {
            recoil: { hp: -Math.floor(source.user.stats.hp.max / DAMAGE_FACTOR) },
          },
        })
      );
    }

    return {
      name: Aftermath.name,
      activate: () => self.on("effectReceipt", damageAttackerOnFaint),
      deactivate: () => self.off("effectReceipt", damageAttackerOnFaint),
      expiry: permanent,
    };
  },
};
