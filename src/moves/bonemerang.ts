import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Bonemerang: Move = preload.register<Move>((C: Codex) => ({
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