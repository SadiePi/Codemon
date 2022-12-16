import C, { Move } from "../index.ts";

export const DrillPeck: Move = {
  name: "Drill Peck",
  description: "A corkscrewing attack that strikes the target with a sharp beak acting as a drill.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 20,
  power: 80,
  target: "Any",
  makesContact: true,
};
