import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const FireSpin = moves.register(() => ({
  name: "Fire Spin",
  description: "The target becomes trapped within a fierce vortex of fire that rages for four to five turns.",
  type: C.Types.Fire,
  category: "Special",
  pp: 15, // max 24
  power: 35,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
