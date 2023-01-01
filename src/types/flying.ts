import { Codex, dexBuilder, Type } from "../index.ts";

export const Flying: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Flying",
  color: "#A890F0",
  weaknesses: [C.Types.Rock, C.Types.Electric, C.Types.Ice],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Grass],
  immunities: [C.Types.Ground],
}));
