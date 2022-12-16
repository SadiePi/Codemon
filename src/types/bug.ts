import C, { Type } from "../index.ts";

export const Bug: Type = {
  name: "Bug",
  color: "#A8B820",
  weaknesses: [C.Types.Flying, C.Types.Rock, C.Types.Fire],
  resistances: [C.Types.Fighting, C.Types.Ground, C.Types.Grass],
  immunities: [],
};
