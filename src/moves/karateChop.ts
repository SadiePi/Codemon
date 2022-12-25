import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const KarateChop = moves.register(() => ({
  name: "Karate Chop",
  description: "The target is attacked with a sharp chop. Critical hits land more easily.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 25,
  target: "Any Adjacent",
  makesContact: true,
  criticalHitStage: 1,

  power: 50,
}));
