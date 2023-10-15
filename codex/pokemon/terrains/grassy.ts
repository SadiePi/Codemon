import loader from "../loader.ts";
import { Terrain, roundDuration } from "../mod.ts";

export const Grassy: Terrain = loader.register(P => ({
  name: "Grassy",
  description:
    "For five turns, the battlefield becomes Grassy Terrain. This restores the HP of Pokémon on the ground a little every turn and powers up Grass-type moves.",
  slot: "terrain",

  apply: ({ battle }) => {
    // TODO restore HP
    // TODO boost Grass-type moves
    // TODO halve damage from Bulldoze, Earthquake, and Magnitude

    return {
      name: Grassy.name,
      activate: () => {},
      deactivate: () => {},
      expiry: roundDuration(5, battle), // TODO extend to 8 if user is holding Terrain Extender
    };
  },
}));
