import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Peck: Move = preload.register<Move>((C: Codex) => ({
  name: "Peck",
  description: "The target is jabbed with a sharply pointed beak or horn.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  attack: power(35),
  target: "Any",
  makesContact: true,
}));
