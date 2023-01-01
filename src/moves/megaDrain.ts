import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const MegaDrain: Move = preload.register<Move>((C: Codex) => ({
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
