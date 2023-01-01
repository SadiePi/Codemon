import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Flying: Type = dexBuilder.register<Type>(() => ({
  name: "Flying",
  color: "#A890F0",
  weaknesses: [C.Types.Rock, C.Types.Electric, C.Types.Ice],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Grass],
  immunities: [C.Types.Ground],
}));
