import C, { Move } from "../index.ts";

export const SpikeCannon: Move = {
  name: "Spike Cannon",
  description: "Sharp spikes are shot at the target in rapid succession. Two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 20,
  makesContact: false,
};
// TODO multihit moves