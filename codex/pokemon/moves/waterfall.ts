import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Waterfall: Move = loader.register<Move>(P => ({
  name: "Waterfall",
  description: "The user charges at the target and may make it flinch.",
  type: P.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(80),
  makesContact: true,
  status: chance(2 / 10, P.Statuses.Flinch),
}));
