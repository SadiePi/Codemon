import { power, Move, multiHit } from "../mod.ts";
import loader from "../loader.ts";

export const SpikeCannon: Move = loader.register<Move>(P => ({
  name: "Spike Cannon",
  description: "Sharp spikes are shot at the target in rapid succession. Two to five times in a row.",
  type: P.Types.Normal,
  target: { position: "Adjacent" },
  category: "Physical",
  pp: 15,
  attack: power(20),
  makesContact: false,
  hitAgain: multiHit(2, 5),
}));
