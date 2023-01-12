import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Bug: Type = loader.register<Type>((C: Codex) => ({
  name: "Bug",
  color: "#A8B820",
  weaknesses: [C.Types.Flying, C.Types.Rock, C.Types.Fire],
  resistances: [C.Types.Fighting, C.Types.Ground, C.Types.Grass],
  immunities: [],
}));
