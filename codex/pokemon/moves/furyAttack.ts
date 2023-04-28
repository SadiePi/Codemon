import { power, Move, multiHit } from "../mod.ts";
import loader from "../loader.ts";

export const FuryAttack: Move = loader.register<Move>(P => ({
  name: "Fury Attack",
  description: "The target is jabbed repeatedly with a horn or beak two to five times in a row.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  attack: power(15),
  accuracy: 85,
  makesContact: true,
  hitAgain: multiHit(2, 5),
}));
