import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const DrillPeck: Move = dexBuilder.register<Move>(() => ({
  name: "Drill Peck",
  description: "A corkscrewing attack that strikes the target with a sharp beak acting as a drill.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 20,
  attack: power(80),
  target: "Any",
  makesContact: true,
}));
