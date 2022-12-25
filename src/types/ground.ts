import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Ground = types.register(() => ({
  name: "Ground",
  color: "#E0C068",
  weaknesses: [C.Types.Water, C.Types.Grass, C.Types.Ice],
  resistances: [C.Types.Poison, C.Types.Rock],
  immunities: [C.Types.Electric],
}));
