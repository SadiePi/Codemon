import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const DualChop: Move = loader.register<Move>(P => ({
  name: "Dual Chop",
  description: "The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row.",
  type: P.Types.Dragon,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
}));
// TODO multihit moves
