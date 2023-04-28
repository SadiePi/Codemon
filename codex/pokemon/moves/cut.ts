import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Cut: Move = loader.register<Move>(P => ({
  name: "Cut",
  description: "The target is cut with a scythe or claw.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 30,
  attack: power(50),
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: true,
}));
