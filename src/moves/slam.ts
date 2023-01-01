import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Slam: Move = dexBuilder.register<Move>(() => ({
  name: "Slam",
  description: "The target is slammed with a long tail, vines, or the like to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(80),
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
}));
