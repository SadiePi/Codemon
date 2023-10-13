import { Ability, Effects, MoveEntry, permanent, proxy, TraditionalBBP as T, TargetContext } from "../mod.ts";

export const Competitive: Ability = {
  name: "Competitive",
  description: "Boosts the Pokémon's Sp. Atk stat sharply when its stats are lowered by an opposing Pokémon.",
  slot: "ability",

  apply: ({ self }) => {
    function boostOnStageLowered(effect: Effects<T>, { source }: TargetContext<T>) {
      if (source instanceof MoveEntry && source.user === self) return;
      if (!effect.stages) return;

      effect.stages = proxy(effect.stages, stages => {
        if (!stages) return;
        let boosts = 0;
        if (stages.attack !== undefined && stages.attack < 0) boosts++;
        if (stages.defense !== undefined && stages.defense < 0) boosts++;
        if (stages.specialAttack !== undefined && stages.specialAttack < 0) boosts++;
        if (stages.specialDefense !== undefined && stages.specialDefense < 0) boosts++;
        if (stages.speed !== undefined && stages.speed < 0) boosts++;
        if (boosts > 0) stages.specialAttack = stages.specialAttack ?? 0 + boosts * 2;
      });
    }

    return {
      name: Competitive.name,
      activate: () => self.on("receiveEffects", boostOnStageLowered),
      deactivate: () => self.off("receiveEffects", boostOnStageLowered),
      expiry: permanent,
    };
  },
};
