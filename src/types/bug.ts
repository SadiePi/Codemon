import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Bug = types.register(() => ({
  name: "Bug",
  color: "#A8B820",
  weaknesses: [C.Types.Flying, C.Types.Rock, C.Types.Fire],
  resistances: [C.Types.Fighting, C.Types.Ground, C.Types.Grass],
  immunities: [],
}));
