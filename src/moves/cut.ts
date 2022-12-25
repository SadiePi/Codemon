import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Cut = moves.register(() => ({
  name: "Cut",
  description: "The target is cut with a scythe or claw.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  power: 50,
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: true,
}));
