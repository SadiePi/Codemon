import { Move, power } from "../mod.ts";
import loader from "../loader.ts";

export const Pound: Move = loader.register<Move>(P => ({
  name: "Pound",
  description: "The target is physically pounded with a long tail, a foreleg, or the like.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 35,
  target: { position: "Adjacent" },
  makesContact: true,

  attack: power(40),
}));
