import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Fairy = types.register(() => ({
  name: "Fairy",
  color: "#EE99AC",
  weaknesses: [C.Types.Poison, C.Types.Steel],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Dark],
  immunities: [C.Types.Dragon],
}));
