import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const DoubleKick = moves.register(() => ({
  name: "Double Kick",
  description: "The target is quickly kicked twice in succession using both feet.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 30,
  power: 30,
  target: "Any Adjacent",
  makesContact: true,
  // hitAgain: h => h < 2,
}));
