import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const LeechLife: Move = loader.register<Move>(P => ({
  name: "Leech Life",
  description:
    "The user drains the target's blood. The user's HP is restored by up to half the damage taken by the target.",
  type: P.Types.Bug,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(80),
  makesContact: true,
  leech: 1 / 2,
}));
