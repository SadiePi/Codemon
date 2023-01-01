import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Ground: Type = dexBuilder.register<Type>(() => ({
  name: "Ground",
  color: "#E0C068",
  weaknesses: [C.Types.Water, C.Types.Grass, C.Types.Ice],
  resistances: [C.Types.Poison, C.Types.Rock],
  immunities: [C.Types.Electric],
}));
