import P, { Ability, Effects, permanent, proxy, TraditionalBBP as T } from "../mod.ts";

export const DragonsMaw: Ability = {
  name: "Dragon's Maw", // OwO
  description: "Powers up Dragon-type moves",
  slot: "ability",

  apply: ({ self }) => {
    function boostDragonMoves(effect: Effects<T>) {
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        if (result && result.type == P.Types.Dragon) result.stat *= 1.5;
      });
    }

    return {
      name: DragonsMaw.name,
      activate: () => self.on("inflictEffects", boostDragonMoves),
      deactivate: () => self.off("inflictEffects", boostDragonMoves),
      expiry: permanent,
    };
  },
};
