import loader from "../loader.ts";
import { Ability, Effects, TargetContext, permanent, TraditionalBBP as T, MoveEntry, proxy } from "../mod.ts";

export const FlareBoost: Ability = loader.register(P => ({
  name: "Flare Boost",
  description: "Powers up special moves when the Pokémon is burned.",
  slot: "ability",

  apply: ({ self }) => {
    function boostSpecialWhenBurned(effect: Effects<T>, { source }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.category !== "Special") return;
      if (!self.statuses.map(s => s.status).includes(P.Statuses.Burn)) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        result.power *= 1.5;
      });
    }

    return {
      name: FlareBoost.name,
      activate: () => self.on("inflictEffects", boostSpecialWhenBurned),
      deactivate: () => self.off("inflictEffects", boostSpecialWhenBurned),
      expiry: permanent,
    };
  },
}));
