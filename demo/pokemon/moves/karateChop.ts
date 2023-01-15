import { Codex, power, Move, register } from "../index.ts";

export const KarateChop: Move = register<Move>((C: Codex) => ({
  name: "Karate Chop",
  description: "The target is attacked with a sharp chop. Critical hits land more easily.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 25,
  target: "Any Adjacent",
  makesContact: true,
  criticalHitStage: 1,

  attack: power(50),
}));
