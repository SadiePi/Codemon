// TODO convert to a nested format
// this is bigger than I thought

export * from "../../src/mod.ts";
import { Codex } from "../../src/mod.ts";
import loader from "./loader.ts";

import Pokedex from "../pokemon/mod.ts";
import * as Abilities from "./abilities.ts";
import * as Items from "./items.ts";
import * as Moves from "./moves.ts";
import * as Species from "./species.ts";
import * as Types from "./types.ts";
import * as Weather from "./weather.ts";

const U = {
  ...Pokedex,
  Abilities: { ...Abilities, ...Pokedex.Abilities },
  Items: { ...Items, ...Pokedex.Items },
  Moves: { ...Moves, ...Pokedex.Moves },
  Species: { ...Species, ...Pokedex.Species },
  Types: { ...Types, ...Pokedex.Types },
  Weathers: { ...Weather, ...Pokedex.Weathers },
} as const satisfies Codex;
export type UraniumCodex = typeof U;

loader.build(U); // no config, same as Pokedex

export default U;
