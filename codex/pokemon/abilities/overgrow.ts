import P, { Ability, Effects, MoveEntry, TraditionalBBP as T, TargetContext, permanent, proxy } from "../mod.ts";

export const Overgrow: Ability = {
  name: "Overgrow",
  description: "Powers up Grass-type moves when the Pokémon's HP is low.",
  slot: "ability",

  apply: ({ self }) => {
    const boostGrassMovesWhenLowHP = (effect: Effects<T>, context: TargetContext<T>) => {
      if (self.stats.hp.percent > 1 / 3) return;

      const { source } = context;
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== P.Types.Grass) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (result) result.stat = result.stat * 1.5;
      });
    };

    return {
      name: Overgrow.name,
      activate: () => self.on("inflictEffects", boostGrassMovesWhenLowHP),
      deactivate: () => self.off("inflictEffects", boostGrassMovesWhenLowHP),
      expiry: permanent,
    };
  },
};
