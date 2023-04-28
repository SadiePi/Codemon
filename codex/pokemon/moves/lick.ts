import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Lick: Move = loader.register<Move>(P => ({
  name: "Lick",
  description: "The target is licked with a long tongue, causing damage. It may also leave the target with paralysis.",
  type: P.Types.Ghost,
  target: "Any Adjacent",
  category: "Physical",
  pp: 30,
  attack: power(30),
  makesContact: true,
  status: chance(3 / 10, P.Statuses.Paralysis),
}));
