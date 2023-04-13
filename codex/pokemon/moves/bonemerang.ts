import { power, Move, multiHit } from "../index.ts";
import loader from "../loader.ts";

export const Bonemerang: Move = loader.register<Move>(P => ({
  name: "Bonemerang",
  description: "The user throws the bone it holds. The bone loops around to hit the target twice—coming and going.",
  type: P.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(50),
  accuracy: 90,
  makesContact: false,
  hitAgain: multiHit(2, 2), // TODO make better
}));
