import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Headbutt: Move = loader.register<Move>(P => ({
  name: "Headbutt",
  description:
    "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(70),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(3 / 10, P.Statuses.Flinch),
}));
