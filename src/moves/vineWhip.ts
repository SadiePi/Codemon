import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const VineWhip = moves.register(() => ({
  name: "Vine Whip",
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  power: 45,
  target: "Any Adjacent",
  makesContact: true,
}));
