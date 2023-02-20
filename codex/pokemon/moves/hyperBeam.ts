import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const HyperBeam: Move = loader.register<Move>(P => ({
  name: "Hyper Beam",
  description: "The target is attacked with a powerful beam. The user can't move on the next turn.",
  type: P.Types.Normal,
  category: "Special",
  pp: 5,
  attack: power(150),
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
