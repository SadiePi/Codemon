import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const KarateChop: Move = dexBuilder.register<Move>(() => ({
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
