import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const MegaDrain: Move = dexBuilder.register<Move>(() => ({
  name: "Mega Drain",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 15,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
}));
