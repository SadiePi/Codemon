import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Clamp: Move = loader.register<Move>(P => ({
  name: "Clamp",
  description: "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns.",
  type: P.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(35),
  accuracy: 85,
  makesContact: true,
}));
// TODO multiturn moves
