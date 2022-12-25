import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const DoubleSlap = moves.register(() => ({
  name: "Double Slap",
  description: "The target is slapped repeatedly, back and forth, two to five times in a row.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 10,
  target: "Any Adjacent",
  makesContact: true,

  accuracy: 85,
  power: 15,
}));
// TODO multihit
