import Pokedex from "../pokemon/index.ts";
import * as Species from "./species.ts";
import * as Types from "./types.ts";
import * as Abilities from "./abilities.ts";
import * as Moves from "./moves.ts";
import loader from "./loader.ts";

export const UraniumCodex = {
  ...Pokedex,
  Species: { ...Species, ...Pokedex.Species },
  Types: { ...Types, ...Pokedex.Types },
  Abilities: { ...Abilities, ...Pokedex.Abilities },
  Moves: { ...Moves, ...Pokedex.Moves },
} as const;
export type UraniumCodex = typeof UraniumCodex;

loader.build(UraniumCodex);
export default UraniumCodex;
