import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Slam = moves.register(() => ({
  name: "Slam",
  description: "The target is slammed with a long tail, vines, or the like to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
}));
