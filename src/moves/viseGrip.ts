import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const ViseGrip: Move = dexBuilder.register<Move>(() => ({
  name: "Vise Grip",
  description: "The target is gripped and squeezed from both sides to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  attack: power(55),
  target: "Any Adjacent",
  makesContact: true,
}));
