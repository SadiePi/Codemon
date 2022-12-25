import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const SolarBeam = moves.register(() => ({
  name: "Solar Beam",
  description: "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
  type: C.Types.Grass,
  category: "Special",
  pp: 10, // max 16
  power: 120,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
