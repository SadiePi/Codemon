import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Wrap: Move = dexBuilder.register<Move>(() => ({
  name: "Wrap",
  description: "A long body, vines, or the like are used to wrap and squeeze the target for four to five turns.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(15),
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
}));
// TODO multiturn moves
