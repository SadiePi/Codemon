import { Codex, dexBuilder, Type } from "../index.ts";

export const Ground: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Ground",
  color: "#E0C068",
  weaknesses: [C.Types.Water, C.Types.Grass, C.Types.Ice],
  resistances: [C.Types.Poison, C.Types.Rock],
  immunities: [C.Types.Electric],
}));
