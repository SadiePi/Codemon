import { chance, power, Move, multiHit } from "../mod.ts";
import loader from "../loader.ts";

export const Twineedle: Move = loader.register<Move>(P => ({
  name: "Twineedle",
  description:
    "The user damages the target twice in succession by jabbing it with two spikes. This may also poison the target.",
  type: P.Types.Bug,
  category: "Physical",
  pp: 20,
  attack: power(25),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(2 / 10, P.Statuses.Poison),
  hitAgain: multiHit(2, 2),
}));
