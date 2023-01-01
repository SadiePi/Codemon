import C, { Move, power } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Barrier: Move = dexBuilder.register<Move>(() => ({
  name: "Barrier",
  description: "The user throws up a sturdy wall that sharply raises its Defense stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stages: { defense: 2 },
}));
