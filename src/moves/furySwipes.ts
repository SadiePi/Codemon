import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const FurySwipes = moves.register(() => ({
  name: "Fury Swipes",
  description: "The target is raked with sharp claws or scythes quickly two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 18,
  accuracy: 80,
  makesContact: true,
}));
// TODO multihit moves
