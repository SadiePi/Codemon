import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const SandTomb = moves.register(() => ({
  name: "Sand Tomb",
  description: "The user traps the target inside a harshly raging sandstorm for four to five turns.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 15, // max 24
  power: 35,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
