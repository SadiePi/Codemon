import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Normal: Type = dexBuilder.register<Type>(() => ({
  name: "Normal",
  color: "#A8A878",
  weaknesses: [C.Types.Fighting],
  resistances: [],
  immunities: [C.Types.Ghost],
}));
