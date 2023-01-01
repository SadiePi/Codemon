import C, { Move, power } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Absorb: Move = dexBuilder.register<Move>(() => ({
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
}));
