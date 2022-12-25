import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Ice = types.register(() => ({
  name: "Ice",
  color: "#98D8D8",
  weaknesses: [C.Types.Fighting, C.Types.Rock, C.Types.Steel, C.Types.Fire],
  resistances: [C.Types.Ice],
  immunities: [],
}));
