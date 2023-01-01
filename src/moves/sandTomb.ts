import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const SandTomb: Move = dexBuilder.register<Move>(() => ({
  name: "Sand Tomb",
  description: "The user traps the target inside a harshly raging sandstorm for four to five turns.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 15, // max 24
  attack: power(35),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
