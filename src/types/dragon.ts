import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Dragon = types.register(() => ({
  name: "Dragon",
  color: "#7038F8",
  weaknesses: [C.Types.Ice, C.Types.Dragon, C.Types.Fairy],
  resistances: [C.Types.Fire, C.Types.Water, C.Types.Grass, C.Types.Electric],
  immunities: [],
}));
