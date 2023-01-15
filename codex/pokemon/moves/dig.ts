import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Dig: Move = loader.register<Move>(P => ({
  name: "Dig",
  description: "The user burrows into the ground, then attacks on the next turn.",
  type: P.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
  status: P.Statuses.SemiInvulnerableTurn,
}));
// TODO multiturn moves
