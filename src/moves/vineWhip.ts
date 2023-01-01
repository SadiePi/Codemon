import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const VineWhip: Move = dexBuilder.register<Move>(() => ({
  name: "Vine Whip",
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  attack: power(45),
  target: "Any Adjacent",
  makesContact: true,
}));
