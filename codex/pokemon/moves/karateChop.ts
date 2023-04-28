import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const KarateChop: Move = loader.register<Move>(P => ({
  name: "Karate Chop",
  description: "The target is attacked with a sharp chop. Critical hits land more easily.",
  type: P.Types.Fighting,
  category: "Physical",
  pp: 25,
  target: "Any Adjacent",
  makesContact: true,
  criticalHitStage: 1,

  attack: power(50),
}));
