export * from "./core/index.ts";
import loader from "./loader.ts";

import * as Abilities from "./abilities/index.ts";
import * as Experience from "./experience/index.ts";
import * as Genders from "./genders/index.ts";
import * as Items from "./items/index.ts";
import * as Locales from "./locales/index.ts";
import * as Moves from "./moves/index.ts";
import * as Natures from "./natures/index.ts";
import * as Species from "./species/index.ts";
import * as Statuses from "./statuses/index.ts";
import * as Trainers from "./trainers/index.ts";
import * as Types from "./types/index.ts";
import * as Weathers from "./weather/index.ts";

const C = {
  Abilities,
  Experience,
  Genders,
  Items,
  Locales,
  Moves,
  Natures,
  Species,
  Statuses,
  Trainers,
  Types,
  Weathers
} as const;
export type Codex = typeof C;

loader.build(C);

export default C;
