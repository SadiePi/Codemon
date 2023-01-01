import { Codex, dexBuilder, Type } from "../index.ts";

export const Water: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Water",
  color: "#6890F0",
  weaknesses: [C.Types.Grass, C.Types.Electric],
  resistances: [C.Types.Steel, C.Types.Fire, C.Types.Water, C.Types.Ice],
  immunities: [],
}));
