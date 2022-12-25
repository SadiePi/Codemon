import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const WingAttack = moves.register(() => ({
  name: "Wing Attack",
  description: "The target is struck with large, imposing wings spread wide to inflict damage.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  power: 60,
  target: "Any",
  makesContact: true,
}));
