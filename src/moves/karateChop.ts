import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const KarateChop: Move = loader.register<Move>((C: Codex) => ({
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
