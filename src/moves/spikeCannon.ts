import { Codex, dexBuilder, power, Move } from "../index.ts";

export const SpikeCannon: Move = dexBuilder.register<Move>((C: Codex) => ({
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
