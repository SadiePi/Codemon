import loader from "../loader.ts";
import { Terrain, roundDuration } from "../mod.ts";

export const Misty: Terrain = loader.register(P => ({
  name: "Misty",
  description:
    "For five turns, protects Pokémon on the ground from status conditions and halves damage from Dragon-type moves.",
  slot: "terrain",

  apply: ({ battle }) => {
    // TODO prevent status conditions
    // TODO halve damage from Dragon-type moves

    return {
      name: Misty.name,
      activate: () => {},
      deactivate: () => {},
      expiry: roundDuration(5, battle), // TODO extend to 8 if user is holding Terrain Extender
    };
  },
}));
