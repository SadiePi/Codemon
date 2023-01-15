import { Codex, Codemon, EffectTarget, Move, register } from "../index.ts";

declare function substitute(target: Codemon): EffectTarget;

export const Substitute: Move = register<Move>((C: Codex) => ({
  name: "Substitute",
  description:
    "The user creates a substitute for itself using some of its HP. The substitute serves as the user's decoy.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 10,
  makesContact: false,
}));
// TODO substitute
