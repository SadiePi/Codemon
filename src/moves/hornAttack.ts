import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const HornAttack: Move = dexBuilder.register<Move>(() => ({
  name: "Horn Attack",
  description: "The target is jabbed with a sharply pointed horn to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 25,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: true,
}));
