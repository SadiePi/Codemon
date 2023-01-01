import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const QuickAttack: Move = preload.register<Move>((C: Codex) => ({
  name: "Quick Attack",
  description: "The user lunges at the target at a speed that makes it almost invisible. This move always goes first.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30, // max 48
  attack: power(40),
  priority: 1,
  target: "Any Adjacent",
  makesContact: true,
}));