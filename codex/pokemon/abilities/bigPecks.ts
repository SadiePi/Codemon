import { Ability, Effects, TargetContext, permanent, TraditionalBBP as T, MoveEntry, proxy } from "../mod.ts";

export const BigPecks: Ability = {
  name: "Big Pecks",
  description: "Prevents the Pokémon from having its Defense stat lowered. ",
  slot: "ability",

  apply: ({ self }) => {
    function cancelDefenseDrop(effect: Effects<T>, { source }: TargetContext<T>) {
      if (source instanceof MoveEntry && source.user === self) return;
      if (!effect.stages) return;

      effect.stages = proxy(effect.stages, stages => {
        if (stages && stages.defense) stages.defense = Math.max(0, stages.defense);
      });
    }

    return {
      name: BigPecks.name,
      activate: () => self.on("receiveEffects", cancelDefenseDrop),
      deactivate: () => self.off("receiveEffects", cancelDefenseDrop),
      expiry: permanent,
    };
  },
};
