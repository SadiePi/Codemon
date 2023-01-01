import { Codex, Move, power } from "../index.ts";
import preload from "../preload.ts";

export const Pound: Move = preload.register<Move>((C: Codex) => ({
  name: "Pound",
  description: "The target is physically pounded with a long tail, a foreleg, or the like.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  target: "Any Adjacent",
  makesContact: true,

  attack: power(40),
}));
