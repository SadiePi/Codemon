import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Growth = moves.register(() => ({
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stages: { attack: 1, specialAttack: 1 },
}));
