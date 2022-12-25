import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Fire = types.register(() => ({
  name: "Fire",
  color: "#F08030",
  weaknesses: [C.Types.Ground, C.Types.Rock, C.Types.Water],
  resistances: [C.Types.Bug, C.Types.Steel, C.Types.Fire, C.Types.Grass, C.Types.Ice, C.Types.Fairy],
  immunities: [],
}));
