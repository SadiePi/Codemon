import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Wrap: Move = loader.register<Move>(P => ({
  name: "Wrap",
  description: "A long body, vines, or the like are used to wrap and squeeze the target for four to five turns.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(15),
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
}));
// TODO multiturn moves
