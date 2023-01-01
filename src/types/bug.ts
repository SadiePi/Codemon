import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Bug: Type = dexBuilder.register<Type>(() => ({
  name: "Bug",
  color: "#A8B820",
  weaknesses: [C.Types.Flying, C.Types.Rock, C.Types.Fire],
  resistances: [C.Types.Fighting, C.Types.Ground, C.Types.Grass],
  immunities: [],
}));
