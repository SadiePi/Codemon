import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Water: Type = preload.register<Type>((C: Codex) => ({
  name: "Water",
  color: "#6890F0",
  weaknesses: [C.Types.Grass, C.Types.Electric],
  resistances: [C.Types.Steel, C.Types.Fire, C.Types.Water, C.Types.Ice],
  immunities: [],
}));
