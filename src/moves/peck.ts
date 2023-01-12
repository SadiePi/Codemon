import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const Peck: Move = loader.register<Move>((C: Codex) => ({
  name: "Peck",
  description: "The target is jabbed with a sharply pointed beak or horn.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  attack: power(35),
  target: "Any",
  makesContact: true,
}));
