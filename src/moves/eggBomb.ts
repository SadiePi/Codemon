import { Codex, dexBuilder, power, Move } from "../index.ts";

export const EggBomb: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Egg Bomb",
  description: "A large egg is hurled at the target with maximum force to inflict damage.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10, // max 16
  attack: power(100),
  accuracy: 75,
  makesContact: false,
}));
