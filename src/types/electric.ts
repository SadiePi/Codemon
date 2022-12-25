import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Electric = types.register(() => ({
  name: "Electric",
  color: "#F8D030",
  weaknesses: [C.Types.Ground],
  resistances: [C.Types.Flying, C.Types.Steel, C.Types.Electric],
  immunities: [],
}));
