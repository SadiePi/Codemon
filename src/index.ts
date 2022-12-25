export * from "./core/index.ts";
import * as Builders from "./core/codex.ts";

import * as Battles from "./battles/index.ts";
import * as Species from "./species/index.ts";
import * as Moves from "./moves/index.ts";
import * as Types from "./types/index.ts";
import * as Natures from "./natures/index.ts";
import * as Statuses from "./statuses/index.ts";
import * as Experience from "./experience/index.ts";
import * as Abilities from "./abilities/index.ts";
import * as Items from "./items/index.ts";
import * as Genders from "./genders/index.ts";

const Codex = {
  Abilities,
  Battles,
  Experience,
  Genders,
  Items,
  Moves,
  Natures,
  Species,
  Statuses,
  Types,
} as const;
export default Codex;

Builders.types.build();
Builders.moves.build();
Builders.species.build();

// TODO use?
type DeepMap<T, U> = T extends Record<string, unknown> ? { [K in keyof T]: DeepMap<T[K], U> } : U;
export type DiscoveryMap = DeepMap<typeof Codex, boolean>;
