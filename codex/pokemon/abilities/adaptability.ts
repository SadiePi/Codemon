import { Ability, Effects, MoveEntry, TraditionalBBP as T, TargetContext, permanent, proxy } from "../mod.ts";

const STAB_BOOST = 4 / 3;

export const Adaptability: Ability = {
  name: "Adaptability",
  description: "Powers up moves of the same type as the Pokémon.",
  slot: "ability",

  apply: ({ self }) => {
    function boostSTAB(effect: Effects<T>, context: TargetContext<T>) {
      const { action } = context;
      if (!effect.attack) return;
      if (!(action.params.source instanceof MoveEntry)) return;
      if (action.params.source.user !== self) return;

      effect.attack = proxy(effect.attack, result => {
        if (result && result.stab) result.stab *= STAB_BOOST;
      });
    }

    return {
      name: Adaptability.name,
      activate: () => {
        self.on("inflictEffects", boostSTAB);
      },
      deactivate: () => {
        self.off("inflictEffects", boostSTAB);
      },
      expiry: permanent,
    };
  },
};
