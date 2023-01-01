import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Bind: Move = dexBuilder.register<Move>(() => ({
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
