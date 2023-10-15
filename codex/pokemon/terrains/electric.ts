import { Terrain, roundDuration, TraditionalBBP as T, Effects, TargetContext, MoveEntry, proxy } from "../mod.ts";
import loader from "../loader.ts";

export const Electric: Terrain = loader.register(P => ({
  name: "Electric",
  description: "For five turns, Pokémon on the ground won't fall asleep. The power of Electric-type moves is boosted.",
  slot: "terrain",

  apply: ({ battle }) => {
    function boostElectricMoves(effect: Effects<T>, { source }: TargetContext<T>) {
      // TODO if(target is not grounded) return;
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== P.Types.Electric) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        result.power *= 1.3;
      });
    }

    // TODO prevent sleep
    // TODO prevent Yawn effect

    return {
      name: Electric.name,
      activate: () => battle.on("effect", boostElectricMoves),
      deactivate: () => battle.off("effect", boostElectricMoves),
      expiry: roundDuration(5, battle), // TODO extend to 8 if user is holding Terrain Extender
    };
  },
}));
