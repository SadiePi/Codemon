import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Crabhammer: Move = preload.register<Move>((C: Codex) => ({
  name: "Crabhammer",
  description:
    "The target is hammered with a large pincer. This move has a heightened chance of landing a critical hit.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(100),
  accuracy: 90,
  makesContact: true,
  criticalHitStage: 1,
}));
