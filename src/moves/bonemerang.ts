import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Bonemerang = moves.register(() => ({
  name: "Bonemerang",
  description: "The user throws the bone it holds. The bone loops around to hit the target twice—coming and going.",
  type: C.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 50,
  accuracy: 90,
  makesContact: false,
}));
// TODO multihit moves
