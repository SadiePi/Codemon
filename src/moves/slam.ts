import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const Slam: Move = loader.register<Move>((C: Codex) => ({
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
