import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const SpikeCannon: Move = dexBuilder.register<Move>(() => ({
  name: "Spike Cannon",
  description: "Sharp spikes are shot at the target in rapid succession. Two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(20),
  makesContact: false,
}));
// TODO multihit moves
