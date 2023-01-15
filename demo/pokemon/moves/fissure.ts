import { Codex, power, Move, register } from "../index.ts";

export const Fissure: Move = register<Move>((C: Codex) => ({
  name: "Fissure",
  description:
    "The user opens up a fissure in the ground and drops the target in. The target faints instantly if this attack hits.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 5, // max 8
  accuracy: 30,
  target: "Any Adjacent",
  makesContact: false,
  faint: true,
}));
