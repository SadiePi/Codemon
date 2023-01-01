import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const PetalDance: Move = dexBuilder.register<Move>(() => ({
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
