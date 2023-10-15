import loader from "../loader.ts";
import { Effects, MoveEntry, TargetContext, Terrain, proxy, roundDuration, TraditionalBBP as T } from "../mod.ts";

export const Psychic: Terrain = loader.register(P => ({
  name: "Psychic",
  description: "For five turns, lowers the Speed of Pokémon on the ground.",
  slot: "terrain",

  apply: ({ battle }) => {
    // TODO boost Psychic-type moves
    function boostPsychicMoves(effect: Effects<T>, { source }: TargetContext<T>) {
      // TODO if(target is not grounded) return;
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== P.Types.Psychic) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        if (!result.conditions) result.conditions = {};
        result.conditions.terrain = 1.3;
      });
    }

    // TODO prevent priority hits

    return {
      name: Psychic.name,
      activate: () => battle.on("effect", boostPsychicMoves),
      deactivate: () => battle.off("effect", boostPsychicMoves),
      expiry: roundDuration(5, battle), // TODO extend to 8 if user is holding Terrain Extender
    };
  },
}));
