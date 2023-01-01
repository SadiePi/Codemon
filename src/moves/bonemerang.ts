import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Bonemerang: Move = dexBuilder.register<Move>(() => ({
  name: "Bonemerang",
  description: "The user throws the bone it holds. The bone loops around to hit the target twice—coming and going.",
  type: C.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(50),
  accuracy: 90,
  makesContact: false,
}));
// TODO multihit moves
