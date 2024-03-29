import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const FireBlast: Move = loader.register<Move>(P => ({
  name: "Fire Blast",
  description:
    "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn.",
  type: P.Types.Fire,
  target: { position: "Adjacent" },
  category: "Special",
  pp: 5,
  attack: power(110),
  accuracy: 85,
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Burn),
}));
