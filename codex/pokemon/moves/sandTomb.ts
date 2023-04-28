import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const SandTomb: Move = loader.register<Move>(P => ({
  name: "Sand Tomb",
  description: "The user traps the target inside a harshly raging sandstorm for four to five turns.",
  type: P.Types.Ground,
  category: "Physical",
  pp: 15, // max 24
  attack: power(35),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
