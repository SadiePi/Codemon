import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const DoubleKick: Move = preload.register<Move>((C: Codex) => ({
  name: "Double Kick",
  description: "The target is quickly kicked twice in succession using both feet.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 30,
  attack: power(30),
  target: "Any Adjacent",
  makesContact: true,
  // hitAgain: h => h < 2,
}));