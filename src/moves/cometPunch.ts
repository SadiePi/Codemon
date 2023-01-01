import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const CometPunch: Move = dexBuilder.register<Move>(() => ({
  name: "Comet Punch",
  description: "The target is hit with a flurry of punches that strike two to five times in a row.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  target: "Any Adjacent",
  makesContact: true,

  attack: power(18),
  accuracy: 85,
}));
// TODO multihit
