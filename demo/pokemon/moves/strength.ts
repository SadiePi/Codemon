import { Codex, power, Move, register } from "../index.ts";

export const Strength: Move = register<Move>((C: Codex) => ({
  name: "Strength",
  description: "The target is slugged with a punch thrown at maximum power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
}));
