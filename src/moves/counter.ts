import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Counter = moves.register(() => ({
  name: "Counter",
  description: "A retaliation move that counters any physical attack, inflicting double the damage taken.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  priority: -5,
  target: "Self",
  makesContact: true,
}));
// TODO counter
