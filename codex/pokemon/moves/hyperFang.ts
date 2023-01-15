import { power, Move, chance } from "../index.ts";
import { loader } from "../loader.ts"

export const HyperFang: Move = loader.register<Move>(P => ({
  name: "Hyper Fang",
  description: "The user bites hard on the target with its sharp front fangs. This may also make the target flinch.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(80),
  accuracy: 90,
  makesContact: true,
  status: chance(1 / 10, P.Statuses.Flinch),
}));
