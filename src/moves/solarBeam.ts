import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const SolarBeam: Move = preload.register<Move>((C: Codex) => ({
  name: "Solar Beam",
  description: "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
  type: C.Types.Grass,
  category: "Special",
  pp: 10, // max 16
  attack: power(120),
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves