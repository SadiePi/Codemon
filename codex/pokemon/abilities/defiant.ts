import { Ability, Effects, MoveEntry, TargetContext, permanent, proxy, TraditionalBBP as T } from "../mod.ts";

export const Defiant: Ability = {
  name: "Defiant",
  description: "If the Pokémon has any stat lowered by an opposing Pokémon, its Attack stat will be boosted sharply.",
  slot: "ability",

  apply: ({ self }) => {
    function boostAttackOnStageLowered(effect: Effects<T>, { source }: TargetContext<T>) {
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
        if (boosts > 0) stages.attack = stages.attack ?? 0 + boosts * 2;
      });
    }

    return {
      name: Defiant.name,
      activate: () => self.on("receiveEffects", boostAttackOnStageLowered),
      deactivate: () => self.off("receiveEffects", boostAttackOnStageLowered),
      expiry: permanent,
    };
  },
};
