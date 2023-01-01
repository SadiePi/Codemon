import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Scratch: Move = dexBuilder.register<Move>(() => ({
  name: "Scratch",
  description: "Hard, pointed, sharp claws rake the target to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: true,
}));
