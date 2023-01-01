import { Codex, dexBuilder, Move, power } from "../index.ts";

export const Barrage: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Barrage",
  description: "Round objects are hurled at the target to strike two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  attack: power(15),
  accuracy: 85,
  makesContact: false,
}));
// TODO multihit moves
