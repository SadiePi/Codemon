import { Ability, MoveEntry, TargetContext, effectAction, permanent, TraditionalBBP as T, Effects } from "../mod.ts";

export const RoughSkin: Ability = {
  name: "Rough Skin",
  description: "The Pokémon's rough skin damages attackers that make direct contact with it.",
  slot: "ability",

  apply: ({ self }) => {
    function damageAttackerOnContact(_effect: Effects<T>, context: TargetContext<T>) {
      if (context.target !== self) return;
      const { action } = context;
      if (!(action.params.source instanceof MoveEntry)) return;
      if (!action.params.source.effects.makesContact) return;

      action.reactions.add(
        effectAction(context.battle, action.params.source.user, {
          hp: -Math.floor(action.params.source.user.stats.hp.max / 8),
        })
      );
    }

    return {
      name: RoughSkin.name,
      activate: () => {
        self.on("receiveEffects", damageAttackerOnContact);
      },
      deactivate: () => {
        self.off("receiveEffects", damageAttackerOnContact);
      },
      expiry: permanent,
    };
  },
};
