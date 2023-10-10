import { Ability, Effects, permanent, proxy, TraditionalBBP as T } from "../mod.ts";

export const Contrary: Ability = {
  name: "Contrary",
  description:
    "Reverses any stat changes affecting the Pokémon so that attempts to boost its stats instead lower them—and attempts to lower its stats will boost them.",
  slot: "ability",

  apply: ({ self }) => {
    function reverseStages(effect: Effects<T>) {
      if (!effect.stages) return;

      effect.stages = proxy(effect.stages, stages => {
        if (!stages) return;
        if (stages.attack !== undefined) stages.attack *= -1;
        if (stages.defense !== undefined) stages.defense *= -1;
        if (stages.specialAttack !== undefined) stages.specialAttack *= -1;
        if (stages.specialDefense !== undefined) stages.specialDefense *= -1;
        if (stages.speed !== undefined) stages.speed *= -1;
      });
    }

    return {
      name: Contrary.name,
      activate: () => self.on("receiveEffects", reverseStages),
      deactivate: () => self.off("receiveEffects", reverseStages),
      expiry: permanent,
    };
  },
};
