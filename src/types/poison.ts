import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Poison = types.register(() => ({
  name: "Poison",
  color: "#A040A0",
  weaknesses: [C.Types.Ground, C.Types.Psychic],
  resistances: [C.Types.Fighting, C.Types.Poison, C.Types.Bug, C.Types.Grass, C.Types.Fairy],
  immunities: [],
}));
