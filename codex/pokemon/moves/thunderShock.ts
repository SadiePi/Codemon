import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const ThunderShock: Move = loader.register<Move>(P => ({
  name: "Thunder Shock",
  description:
    "A jolt of electricity crashes down on the target to inflict damage. This may also leave the target with paralysis.",
  type: P.Types.Electric,
  category: "Special",
  pp: 30, // max 48
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Paralysis),
}));
