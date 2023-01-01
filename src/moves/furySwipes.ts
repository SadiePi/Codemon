import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const FurySwipes: Move = dexBuilder.register<Move>(() => ({
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
