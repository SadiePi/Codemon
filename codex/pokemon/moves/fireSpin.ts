import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const FireSpin: Move = loader.register<Move>(P => ({
  name: "Fire Spin",
  description: "The target becomes trapped within a fierce vortex of fire that rages for four to five turns.",
  type: P.Types.Fire,
  category: "Special",
  pp: 15, // max 24
  attack: power(35),
  accuracy: 85,
  target: { position: "Adjacent" },
  makesContact: false,
}));
// TODO multiturn moves
