import { Move } from "../src/move.ts";
import { choose } from "../src/decision.ts";
import loader from "./pokemon/loader.ts";

export const TwistOfFate: Move = loader.register<Move>(P => ({
  name: "Twist of Fate",
  description: "Inflicts a random status effect on the foe.",
  type: P.Types.Fairy,
  pp: 15,
  category: "Special",
  target: "Any Adjacent",
  makesContact: false,
  effect: choose([
    P.Statuses.Burn,
    P.Statuses.Freeze,
    P.Statuses.Paralysis,
    P.Statuses.Poison,
    P.Statuses.Sleep,
    P.Statuses.Confusion,
    P.Statuses.Flinch,
  ]),
}));
