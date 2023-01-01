// Ensure that the uranium demo entries are enabled in ../src/types/index.ts and ../src/species/index.ts

import preload from "./preload.ts"
import C from "../../src/index.ts";
import * as Species from "./species.ts";
import * as Types from "./types.ts";
import * as Abilities from "./abilities.ts";

export const UraniumCodex = {
  ...C,
  Species: { ...Species, ...C.Species },
  Types: { ...Types, ...C.Types },
  Abilities: { ...Abilities, ...C.Abilities },
} as const;
export type UraniumCodex = typeof UraniumCodex;

preload.build(UraniumCodex);

export default UraniumCodex;
