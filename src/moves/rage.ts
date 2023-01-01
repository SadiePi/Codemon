import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Rage: Move = dexBuilder.register<Move>(() => ({
  name: "Rage",
  description:
    "As long as this move is in use, the power of rage raises the Attack stat each time the user is hit in battle.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20, // max 32
  attack: power(20),
  target: "Any Adjacent",
  makesContact: true,
  // TODO functionality
}));
