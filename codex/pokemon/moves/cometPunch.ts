import { power, Move, multiHit } from "../mod.ts";
import loader from "../loader.ts";

export const CometPunch: Move = loader.register<Move>(P => ({
  name: "Comet Punch",
  description: "The target is hit with a flurry of punches that strike two to five times in a row.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 15,
  target: { position: "Adjacent" },
  makesContact: true,

  attack: power(18),
  accuracy: 85,
  hitAgain: multiHit(2, 5),
}));
