import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Bind: Move = loader.register<Move>(P => ({
  name: "Bind",
  description:
    "Things such as long bodies or tentacles are used to bind and squeeze the target for four to five turns.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(15),
  accuracy: 85,
  target: { position: "Adjacent" },
  makesContact: true,
}));
// TODO bind effect
