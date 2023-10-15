import loader from "../loader.ts";
import { Terrain, roundDuration } from "../mod.ts";

export const Psychic: Terrain = loader.register(P => ({
  name: "Psychic",
  description: "For five turns, lowers the Speed of Pokémon on the ground.",
  slot: "terrain",

  apply: ({ battle }) => {
    // TODO prevent priority hits
    // TODO boost Psychic-type moves

    return {
      name: Psychic.name,
      activate: () => {},
      deactivate: () => {},
      expiry: roundDuration(5, battle), // TODO extend to 8 if user is holding Terrain Extender
    };
  },
}));
