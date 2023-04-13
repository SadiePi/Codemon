export * from "../../src/mod.ts";
import { Codex, Nature, choose, NonEmptyArray } from "../../src/mod.ts";
import loader from "./loader.ts";

import * as Abilities from "./abilities/index.ts";
import * as Experience from "./experience/index.ts";
import * as Genders from "./genders/index.ts";
import * as Items from "./items/index.ts";
import * as Moves from "./moves/index.ts";
import * as Natures from "./natures/index.ts";
import * as Species from "./species/index.ts";
import * as Statuses from "./statuses/index.ts";
import * as Strategies from "./strategies/index.ts";
import * as Trainers from "./trainers/index.ts";
import * as Types from "./types/index.ts";
import * as Weathers from "./weather/index.ts";

const P = {
  Abilities,
  Experience,
  Genders,
  Items,
  Moves,
  Natures,
  Species,
  Statuses,
  Strategies,
  Trainers,
  Types,
  Weathers,
} as const satisfies Codex;
export type Pokedex = typeof P;

loader.build(P, {
  struggle: Moves.Struggle,
  wild: Strategies.Wild,
  randomNature: choose(...(Object.values(Natures) as NonEmptyArray<Nature>)),
});

export default P;
