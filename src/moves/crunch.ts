import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Crunch: Move = dexBuilder.register<Move>(() => ({
  name: "Crunch",
  description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
  stages: [1 / 5, { defense: -1 }],
}));
