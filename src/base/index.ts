export * from "../core/index.ts";
export * from "./battle.ts";

import * as Species from "./species.ts";
import * as Moves from "./moves.ts";
import * as Types from "./types.ts";
import * as Natures from "./natures.ts";
import * as Statuses from "./statuses.ts";
import * as Experience from "./experience.ts";
import * as Abilities from "./abilities.ts";
import * as Items from "./items.ts";

/**
 * Acts as the Pokedex for this library
 * Except with waaaay more data than the Pokedex ever revealed
 */
const Codex = {
  Species,
  Moves,
  Types,
  Natures,
  Statuses,
  Experience,
  Abilities,
  Items,
} as const;
export default Codex;

type DeepMap<T, U> = T extends Record<string, unknown> ? { [K in keyof T]: DeepMap<T[K], U> } : U;
export type DiscoveryMap = DeepMap<typeof Codex, boolean>;
