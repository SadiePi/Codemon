import { chance, Codex, power, Move, register } from "../index.ts";

export const BoneClub: Move = register<Move>((C: Codex) => ({
  name: "Bone Club",
  description: "The user clubs the target with a bone. This may also make the target flinch.",
  type: C.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  attack: power(65),
  accuracy: 85,
  makesContact: false,
  status: chance(1 / 10, C.Statuses.Flinch),
}));
