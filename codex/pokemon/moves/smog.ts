import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Smog: Move = loader.register<Move>(P => ({
  name: "Smog",
  description: "The target is attacked with a discharge of filthy gases. This may also poison the target.",
  type: P.Types.Poison,
  target: { position: "Adjacent" },
  category: "Special",
  pp: 20,
  attack: power(30),
  accuracy: 70,
  makesContact: false,
  status: chance(2 / 5, P.Statuses.Poison),
}));
