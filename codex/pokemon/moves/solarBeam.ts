import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const SolarBeam: Move = loader.register<Move>(P => ({
  name: "Solar Beam",
  description: "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
  type: P.Types.Grass,
  category: "Special",
  pp: 10, // max 16
  attack: power(120),
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
