import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const SkyAttack: Move = loader.register<Move>(P => ({
  name: "Sky Attack",
  description: "A second-turn attack move where critical hits land more easily. This may also make the target flinch.",
  type: P.Types.Flying,
  target: "Any",
  category: "Physical",
  pp: 5,
  attack: power(140),
  accuracy: 90,
  makesContact: true,
  criticalHitStage: 1,
  status: chance(1 / 3, P.Statuses.Flinch),
}));
// TODO multiturn moves
