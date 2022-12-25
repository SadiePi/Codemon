import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const DualChop = moves.register(() => ({
  name: "Dual Chop",
  description: "The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
}));
// TODO multihit moves
