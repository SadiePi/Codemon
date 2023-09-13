import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Counter: Move = loader.register<Move>(P => ({
  name: "Counter",
  description: "A retaliation move that counters any physical attack, inflicting double the damage taken.",
  type: P.Types.Fighting,
  category: "Physical",
  pp: 20,
  priority: -5,
  target: { alignment: "Self" },
  makesContact: true,
}));
// TODO counter
