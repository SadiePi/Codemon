import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Bind: Move = preload.register<Move>((C: Codex) => ({
  name: "Bind",
  description:
    "Things such as long bodies or tentacles are used to bind and squeeze the target for four to five turns.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(15),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
}));
// TODO multiturn moves
