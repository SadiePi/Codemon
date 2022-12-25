import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Flying = types.register(() => ({
  name: "Flying",
  color: "#A890F0",
  weaknesses: [C.Types.Rock, C.Types.Electric, C.Types.Ice],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Grass],
  immunities: [C.Types.Ground],
}));
