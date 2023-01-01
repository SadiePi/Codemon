import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const MegaPunch: Move = dexBuilder.register<Move>(() => ({
  name: "Mega Punch",
  description: "The target is slugged by a punch thrown with muscle-packed power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(80),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
}));
