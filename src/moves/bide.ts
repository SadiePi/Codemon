import C, { Move, power } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Bide: Move = dexBuilder.register<Move>(() => ({
  name: "Bide",
  description: "The user endures attacks for two turns, then strikes back to cause double the damage taken.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 10, // max 16
  priority: 1,
  target: "Self",
  makesContact: true,
}));
// TODO multiturn moves
