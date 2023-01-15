import { Codex, power, Move, register } from "../index.ts";

export const RockThrow: Move = register<Move>((C: Codex) => ({
  name: "Rock Throw",
  description: "The user picks up and throws a small rock at the target to attack.",
  type: C.Types.Rock,
  category: "Physical",
  target: "Any Adjacent",
  makesContact: false,
  pp: 15, // max 24
  attack: power(50),
  accuracy: 90,
}));
