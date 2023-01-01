import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const DualChop: Move = dexBuilder.register<Move>(() => ({
  name: "Dual Chop",
  description: "The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
}));
// TODO multihit moves
