import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Crabhammer: Move = loader.register<Move>(P => ({
  name: "Crabhammer",
  description:
    "The target is hammered with a large pincer. This move has a heightened chance of landing a critical hit.",
  type: P.Types.Water,
  target: { position: "Adjacent" },
  category: "Physical",
  pp: 10,
  attack: power(100),
  accuracy: 90,
  makesContact: true,
  criticalHitStage: 1,
}));
