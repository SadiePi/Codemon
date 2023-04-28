export * from "../../src/mod.ts";
import { Codex } from "../../src/mod.ts";
import loader from "./loader.ts";

import Pokedex from "../pokemon/mod.ts";
import * as Species from "./species.ts";
import * as Types from "./types.ts";
import * as Abilities from "./abilities.ts";
import * as Moves from "./moves.ts";

const U = {
  ...Pokedex,
  Species: { ...Species, ...Pokedex.Species },
  Types: { ...Types, ...Pokedex.Types },
  Abilities: { ...Abilities, ...Pokedex.Abilities },
  Moves: { ...Moves, ...Pokedex.Moves },
} as const satisfies Codex;
export type UraniumCodex = typeof U;

loader.build(U); // no config, same as Pokedex

export default U;
