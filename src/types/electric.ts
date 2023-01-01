import { Codex, dexBuilder, Type } from "../index.ts";

export const Electric: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Electric",
  color: "#F8D030",
  weaknesses: [C.Types.Ground],
  resistances: [C.Types.Flying, C.Types.Steel, C.Types.Electric],
  immunities: [],
}));
