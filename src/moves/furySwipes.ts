import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const FurySwipes: Move = loader.register<Move>((C: Codex) => ({
  name: "Fury Swipes",
  description: "The target is raked with sharp claws or scythes quickly two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(18),
  accuracy: 80,
  makesContact: true,
}));
// TODO multihit moves
