import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const HyperBeam: Move = preload.register<Move>((C: Codex) => ({
  name: "Hyper Beam",
  description: "The target is attacked with a powerful beam. The user can't move on the next turn.",
  type: C.Types.Normal,
  category: "Special",
  pp: 5,
  attack: power(150),
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
