import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const DragonRage: Move = preload.register<Move>((C: Codex) => ({
  name: "Dragon Rage",
  description: "This attack hits the target with a shock wave of pure rage. This attack always inflicts 40 HP damage.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  hp: -40,
}));
