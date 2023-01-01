import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Tackle: Move = dexBuilder.register<Move>(() => ({
  name: "Tackle",
  description: "A physical attack in which the user charges and slams into the target with its whole body.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35, // max 56
  attack: power(40),
  target: "Any Adjacent",
  makesContact: true,
}));
