import { Codex, power, Move, register } from "../index.ts";

export const PetalDance: Move = register<Move>((C: Codex) => ({
  name: "Petal Dance",
  description: "The user attacks the target with sharp petals that land on the target.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 10, // max 16
  attack: power(120),
  target: "Random Adjacent Foe",
  makesContact: true,
}));
// TODO multiturn moves
