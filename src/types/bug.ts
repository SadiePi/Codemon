import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Bug: Type = preload.register<Type>((C: Codex) => ({
  name: "Bug",
  color: "#A8B820",
  weaknesses: [C.Types.Flying, C.Types.Rock, C.Types.Fire],
  resistances: [C.Types.Fighting, C.Types.Ground, C.Types.Grass],
  immunities: [],
}));
