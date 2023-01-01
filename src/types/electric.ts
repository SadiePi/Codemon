import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Electric: Type = dexBuilder.register<Type>(() => ({
  name: "Electric",
  color: "#F8D030",
  weaknesses: [C.Types.Ground],
  resistances: [C.Types.Flying, C.Types.Steel, C.Types.Electric],
  immunities: [],
}));
