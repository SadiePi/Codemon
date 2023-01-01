import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Strength: Move = dexBuilder.register<Move>(() => ({
  name: "Strength",
  description: "The target is slugged with a punch thrown at maximum power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
}));
