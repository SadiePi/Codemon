import { Ability, MoveEntry, TargetContext, permanent, TraditionalBBP as T, Effects } from "../mod.ts";

const DAMAGE_FACTOR = 1 / 8;

export const RoughSkin: Ability = {
  name: "Rough Skin",
  description: "The Pokémon's rough skin damages attackers that make direct contact with it.",
  slot: "ability",

  apply: ({ self }) => {
    function damageAttackerOnContact(effect: Effects<T>, context: TargetContext<T>) {
      const { action } = context;

      if (!(action.params.source instanceof MoveEntry)) return;
      if (!action.params.source.effects.makesContact) return;

      effect.recoil = { hp: -Math.floor(action.params.source.user.stats.hp.max * DAMAGE_FACTOR) };
    }

    return {
      name: RoughSkin.name,
      activate: () => self.on("receiveEffects", damageAttackerOnContact),
      deactivate: () => self.off("receiveEffects", damageAttackerOnContact),
      expiry: permanent,
    };
  },
};
