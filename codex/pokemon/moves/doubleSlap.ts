import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const DoubleSlap: Move = loader.register<Move>(P => ({
  name: "Double Slap",
  description: "The target is slapped repeatedly, back and forth, two to five times in a row.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 10,
  target: "Any Adjacent",
  makesContact: true,

  accuracy: 85,
  attack: power(15),
}));
// TODO multihit
