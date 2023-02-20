import { power, Move, chance } from "../index.ts";
import loader from "../loader.ts"

export const PoisonSting: Move = loader.register<Move>(P => ({
  name: "Poison Sting",
  description: "The user stabs the target with a poisonous stinger. This may also poison the target.",
  type: P.Types.Poison,
  category: "Physical",
  pp: 35,
  attack: power(15),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(3 / 10, P.Statuses.Poison),
}));
