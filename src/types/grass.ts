import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Grass: Type = dexBuilder.register<Type>(() => ({
  name: "Grass",
  color: "#78C850",
  weaknesses: [C.Types.Flying, C.Types.Poison, C.Types.Bug, C.Types.Fire, C.Types.Ice],
  resistances: [C.Types.Ground, C.Types.Water, C.Types.Grass, C.Types.Electric],
  immunities: [],
}));
