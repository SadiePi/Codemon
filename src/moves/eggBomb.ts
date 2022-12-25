import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const EggBomb = moves.register(() => ({
  name: "Egg Bomb",
  description: "A large egg is hurled at the target with maximum force to inflict damage.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  accuracy: 75,
  makesContact: false,
}));
