import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Counter: Move = preload.register<Move>((C: Codex) => ({
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