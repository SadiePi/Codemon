import { Codex, power, Move, register } from "../index.ts";

export const MegaPunch: Move = register<Move>((C: Codex) => ({
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
