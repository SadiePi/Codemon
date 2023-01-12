import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const FireSpin: Move = loader.register<Move>((C: Codex) => ({
  name: "Fire Spin",
  description: "The target becomes trapped within a fierce vortex of fire that rages for four to five turns.",
  type: C.Types.Fire,
  category: "Special",
  pp: 15, // max 24
  attack: power(35),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO multiturn moves
