import { Codex, Move, power, register } from "../index.ts";

export const Bide: Move = register<Move>((C: Codex) => ({
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
