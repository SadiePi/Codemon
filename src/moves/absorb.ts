import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";

export const Absorb: Move = loader.register<Move>((C: Codex) => ({
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
}));
