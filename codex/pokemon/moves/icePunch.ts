import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const IcePunch: Move = loader.register<Move>(P => ({
  name: "Ice Punch",
  description: "The target is punched with an icy fist. This may also leave the target frozen.",
  type: P.Types.Ice,
  category: "Physical",
  pp: 15,
  attack: power(75),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(1 / 10, P.Statuses.Freeze),
}));
