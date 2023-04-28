import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Thunderbolt: Move = loader.register<Move>(P => ({
  name: "Thunderbolt",
  description: "A strong electric blast crashes down on the target. This may also leave the target with paralysis.",
  type: P.Types.Electric,
  category: "Special",
  pp: 15, // max 24
  attack: power(90),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Paralysis),
}));
