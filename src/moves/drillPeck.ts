import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const DrillPeck: Move = loader.register<Move>((C: Codex) => ({
  name: "Drill Peck",
  description: "A corkscrewing attack that strikes the target with a sharp beak acting as a drill.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 20,
  attack: power(80),
  target: "Any",
  makesContact: true,
}));
