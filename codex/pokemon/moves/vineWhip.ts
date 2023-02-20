import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const VineWhip: Move = loader.register<Move>(P => ({
  name: "Vine Whip",
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  type: P.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  attack: power(45),
  target: "Any Adjacent",
  makesContact: true,
}));
