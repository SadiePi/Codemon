import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const BoneClub = moves.register(() => ({
  name: "Bone Club",
  description: "The user clubs the target with a bone. This may also make the target flinch.",
  type: C.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  power: 65,
  accuracy: 85,
  makesContact: false,
  status: [C.Statuses.Flinch, 1 / 10],
}));
