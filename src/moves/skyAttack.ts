import C, { Move } from "../index.ts";

export const SkyAttack: Move = {
  name: "Sky Attack",
  description: "A second-turn attack move where critical hits land more easily. This may also make the target flinch.",
  type: C.Types.Flying,
  target: "Any",
  category: "Physical",
  pp: 5,
  power: 140,
  accuracy: 90,
  makesContact: true,
  criticalHitStage: 1,
  status: [C.Statuses.Flinch, 1 / 3],
};
// TODO multiturn moves