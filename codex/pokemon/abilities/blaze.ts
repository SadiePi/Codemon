import P, { Ability, Effects, permanent, TraditionalBBP as T, proxy } from "../mod.ts";

export const Blaze: Ability = {
  name: "Blaze",
  description: "Powers up Fire-type moves when the Pokémon's HP is low.",
  slot: "ability",

  apply: ({ self }) => {
    function boostFireMovesOnLowHP(effect: Effects<T>) {
      if (!effect.attack) return;
      if (self.stats.hp.percent > 1 / 3) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        if (result && result.type == P.Types.Fire) result.stat *= 1.5;
      });
    }

    return {
      name: Blaze.name,
      activate: () => self.on("inflictEffects", boostFireMovesOnLowHP),
      deactivate: () => self.off("inflictEffects", boostFireMovesOnLowHP),
      expiry: permanent,
    };
  },
};
