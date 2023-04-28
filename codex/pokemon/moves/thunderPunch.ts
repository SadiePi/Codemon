import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const ThunderPunch: Move = loader.register<Move>(P => ({
  name: "Thunder Punch",
  description: "The target is punched with an electrified fist. This may also leave the target with paralysis.",
  type: P.Types.Electric,
  category: "Physical",
  pp: 15,
  attack: power(75),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(1 / 10, P.Statuses.Paralysis),
}));
