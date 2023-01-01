import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Growth: Move = dexBuilder.register<Move>(() => ({
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stages: { attack: 1, specialAttack: 1 },
}));
