import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const Crunch: Move = preload.register<Move>((C: Codex) => ({
  name: "Crunch",
  description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
  stages: chance(1 / 5, { defense: -1 }),
}));
