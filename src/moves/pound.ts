import { Move } from "../index.ts";
import * as Types from "../types/index.ts";
import { moves } from "../core/codex.ts";

export const Pound = moves.register(() => ({
  name: "Pound",
  description: "The target is physically pounded with a long tail, a foreleg, or the like.",
  type: Types.Normal,
  category: "Physical",
  pp: 35,
  target: "Any Adjacent",
  makesContact: true,

  power: 40,
}));
