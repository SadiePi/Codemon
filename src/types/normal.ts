import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Normal = types.register(() => ({
  name: "Normal",
  color: "#A8A878",
  weaknesses: [C.Types.Fighting],
  resistances: [],
  immunities: [C.Types.Ghost],
}));
