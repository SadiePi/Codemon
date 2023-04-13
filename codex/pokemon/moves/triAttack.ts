import { power, Move, chance, choose } from "../index.ts";
import loader from "../loader.ts";

export const TriAttack: Move = loader.register<Move>(P => ({
  name: "Tri Attack",
  description:
    "The user strikes with a simultaneous three-beam attack. This may also burn, freeze, or paralyze the target.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Special",
  pp: 10,
  attack: power(80),
  makesContact: false,
  status: chance(1 / 5, choose(P.Statuses.Burn, P.Statuses.Freeze, P.Statuses.Paralysis)),
  // alternatively, less accurate but more fun, and more flexible:
  // status: multiple([
  //   chance(1 / 5, P.Statuses.Burn),
  //   chance(1 / 5, P.Statuses.Freeze),
  //   chance(1 / 5, P.Statuses.Paralysis),
  // ]),
}));
