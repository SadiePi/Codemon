import { Codex, power, Move, register } from "../index.ts";

export const VineWhip: Move = register<Move>((C: Codex) => ({
  name: "Vine Whip",
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  attack: power(45),
  target: "Any Adjacent",
  makesContact: true,
}));
