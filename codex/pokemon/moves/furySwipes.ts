import { power, Move, multiHit } from "../mod.ts";
import loader from "../loader.ts";

export const FurySwipes: Move = loader.register<Move>(P => ({
  name: "Fury Swipes",
  description: "The target is raked with sharp claws or scythes quickly two to five times in a row.",
  type: P.Types.Normal,
  target: { position: "Adjacent" },
  category: "Physical",
  pp: 15,
  attack: power(18),
  accuracy: 80,
  makesContact: true,
  hitAgain: multiHit(2, 5),
}));
