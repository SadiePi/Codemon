import {
  Ability,
  TargetContext,
  TargetEffects,
  permanent,
  TraditionalBBP as T,
  MoveEntry,
  effectAction,
  chance,
} from "../mod.ts";

export const CursedBody: Ability = {
  name: "Cursed Body",
  description: "May disable a move that has dealt damage to the Pokémon. ",
  slot: "ability",

  apply: ({ self }) => {
    function disableOnDamage(_effect: TargetEffects<T>, { action, source, battle }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.category !== "Physical") return;

      action.reactions.add(
        effectAction({
          battle,
          user: self,
          targets: [source.user],
          effect: {
            disable: chance(3 / 10, source),
          },
        })
      );
    }

    return {
      name: CursedBody.name,
      activate: () => self.on("receiveEffects", disableOnDamage),
      deactivate: () => self.off("receiveEffects", disableOnDamage),
      expiry: permanent,
    };
  },
};
