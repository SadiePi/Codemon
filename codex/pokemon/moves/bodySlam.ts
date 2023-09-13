import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const BodySlam: Move = loader.register<Move>(P => ({
  name: "Body Slam",
  description:
    "The user drops onto the target with its full body weight. This may also leave the target with paralysis.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(85),
  target: { position: "Adjacent" },
  makesContact: true,
  status: chance(3 / 10, P.Statuses.Paralysis),
}));
