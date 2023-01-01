import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const WingAttack: Move = dexBuilder.register<Move>(() => ({
  name: "Wing Attack",
  description: "The target is struck with large, imposing wings spread wide to inflict damage.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  attack: power(60),
  target: "Any",
  makesContact: true,
}));
