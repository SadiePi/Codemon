import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Clamp: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Clamp",
  description: "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(35),
  accuracy: 85,
  makesContact: true,
}));
// TODO multiturn moves
