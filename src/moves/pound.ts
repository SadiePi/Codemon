import { Move, power } from "../index.ts";
import * as Types from "../types/index.ts";

export const Pound: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Pound",
  description: "The target is physically pounded with a long tail, a foreleg, or the like.",
  type: Types.Normal,
  category: "Physical",
  pp: 35,
  target: "Any Adjacent",
  makesContact: true,

  attack: power(40),
}));
