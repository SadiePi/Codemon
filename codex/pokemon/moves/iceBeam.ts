import { power, Move, chance } from "../index.ts";
import { loader } from "../loader.ts"

export const IceBeam: Move = loader.register<Move>(P => ({
  name: "Ice Beam",
  description: "The target is struck with an icy-cold beam of energy. This may also leave the target frozen.",
  type: P.Types.Ice,
  category: "Special",
  pp: 10,
  attack: power(90),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Freeze),
}));
