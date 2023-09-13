import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Bite: Move = loader.register<Move>(P => ({
  name: "Bite",
  description: "The target is bitten with viciously sharp fangs. This may also make the target flinch.",
  type: P.Types.Dark,
  category: "Physical",
  pp: 25, // max 40
  attack: power(60),
  target: { position: "Adjacent" },
  makesContact: true,
  status: chance(3 / 10, P.Statuses.Flinch),
}));
