import { power, Move, chance } from "../index.ts";
import loader from "../loader.ts"

export const Ember: Move = loader.register<Move>(P => ({
  name: "Ember",
  description: "The target is attacked with small flames. This may also leave the target with a burn.",
  type: P.Types.Fire,
  category: "Special",
  pp: 25,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Burn),
}));
