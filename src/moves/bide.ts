import { Codex, Move, power } from "../index.ts";
import preload from "../preload.ts";

export const Bide: Move = preload.register<Move>((C: Codex) => ({
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
