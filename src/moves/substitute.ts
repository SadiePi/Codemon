import { Codex, Codemon, EffectTarget, Move } from "../index.ts";
import loader from "../loader.ts";

declare function substitute(target: Codemon): EffectTarget;

export const Substitute: Move = loader.register<Move>((C: Codex) => ({
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
