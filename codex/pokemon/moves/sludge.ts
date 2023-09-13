import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Sludge: Move = loader.register<Move>(P => ({
  name: "Sludge",
  description: "Unsanitary sludge is hurled at the target. This may also poison the target.",
  type: P.Types.Poison,
  target: { position: "Adjacent" },
  category: "Special",
  pp: 20,
  attack: power(65),
  makesContact: false,
  status: chance(3 / 10, P.Statuses.Poison),
}));
