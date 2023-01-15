import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const EggBomb: Move = loader.register<Move>(P => ({
  name: "Egg Bomb",
  description: "A large egg is hurled at the target with maximum force to inflict damage.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10, // max 16
  attack: power(100),
  accuracy: 75,
  makesContact: false,
}));
