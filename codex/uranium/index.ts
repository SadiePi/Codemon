export * from "../../src/mod.ts";
import C, { build } from "../pokemon/index.ts";
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

build(UraniumCodex);

export default UraniumCodex;
