import { power, Move, multiHit } from "../index.ts";
import loader from "../loader.ts";

export const PinMissle: Move = loader.register<Move>(P => ({
  name: "Pin Missile",
  description: "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row.",
  type: P.Types.Bug,
  category: "Physical",
  pp: 20,
  attack: power(25),
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: false,
  hitAgain: multiHit(2, 5),
}));
