import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const SpikeCannon: Move = loader.register<Move>(P => ({
  name: "Spike Cannon",
  description: "Sharp spikes are shot at the target in rapid succession. Two to five times in a row.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(20),
  makesContact: false,
}));
// TODO multihit moves
