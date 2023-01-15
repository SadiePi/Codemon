import { Codex, power, Move, register } from "../index.ts";

export const Fly: Move = register<Move>((C: Codex) => ({
  name: "Fly",
  description: "The user flies up into the sky and then strikes its target on the next turn.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 15,
  attack: power(90),
  accuracy: 95,
  target: "Any",
  makesContact: true,
}));
// TODO multiturn moves
