import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Counter: Move = loader.register<Move>(P => ({
  name: "Counter",
  description: "A retaliation move that counters any physical attack, inflicting double the damage taken.",
  type: P.Types.Fighting,
  category: "Physical",
  pp: 20,
  priority: -5,
  target: "Self",
  makesContact: true,
}));
// TODO counter
