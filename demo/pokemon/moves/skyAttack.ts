import { Codex, chance, power, Move, register } from "../index.ts";

export const SkyAttack: Move = register<Move>((C: Codex) => ({
  name: "Sky Attack",
  description: "A second-turn attack move where critical hits land more easily. This may also make the target flinch.",
  type: C.Types.Flying,
  target: "Any",
  category: "Physical",
  pp: 5,
  attack: power(140),
  accuracy: 90,
  makesContact: true,
  criticalHitStage: 1,
  status: chance(1 / 3, C.Statuses.Flinch),
}));
// TODO multiturn moves
