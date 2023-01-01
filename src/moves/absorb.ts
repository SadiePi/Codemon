import { Codex, dexBuilder, Move, power } from "../index.ts";

export const Absorb: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
}));
