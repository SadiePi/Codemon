import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const HornAttack = moves.register(() => ({
  name: "Horn Attack",
  description: "The target is jabbed with a sharply pointed horn to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 25,
  power: 65,
  target: "Any Adjacent",
  makesContact: true,
}));
