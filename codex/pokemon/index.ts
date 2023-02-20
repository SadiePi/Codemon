export * from "../../src/mod.ts";
import loader from "./loader.ts";
import { NonEmptyArray } from "../../src/util.ts";
import { Nature, oneOf } from "../../src/mod.ts";
import { setRandomNatureDecider, setStruggleInfo, setWildTrainer } from "../../src/injections.ts";

import * as Abilities from "./abilities/index.ts";
import * as Experience from "./experience/index.ts";
import * as Genders from "./genders/index.ts";
import * as Items from "./items/index.ts";
import * as Moves from "./moves/index.ts";
import * as Natures from "./natures/index.ts";
import * as Species from "./species/index.ts";
import * as Statuses from "./statuses/index.ts";
import * as Trainers from "./trainers/index.ts";
import * as Types from "./types/index.ts";
import * as Weathers from "./weather/index.ts";

const Pokedex = {
  Abilities,
  Experience,
  Genders,
  Items,
  Moves,
  Natures,
  Species,
  Statuses,
  Trainers,
  Types,
  Weathers,
} as const;
export type Pokedex = typeof Pokedex;

setWildTrainer(Trainers.Wild);
setRandomNatureDecider(oneOf(...Object.values(Natures) as NonEmptyArray<Nature>)) // TODO egh...
setStruggleInfo(Moves.Struggle);
loader.build(Pokedex);

export default Pokedex;
