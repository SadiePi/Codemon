import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const WingAttack: Move = preload.register<Move>((C: Codex) => ({
  name: "Wing Attack",
  description: "The target is struck with large, imposing wings spread wide to inflict damage.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  attack: power(60),
  target: "Any",
  makesContact: true,
}));
