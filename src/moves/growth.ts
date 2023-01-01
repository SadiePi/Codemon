import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Growth: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stages: { attack: 1, specialAttack: 1 },
}));
