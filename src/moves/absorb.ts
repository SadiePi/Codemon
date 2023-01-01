import { Codex, Move, power } from "../index.ts";
import preload from "../preload.ts";

export const Absorb: Move = preload.register<Move>((C: Codex) => ({
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
}));
