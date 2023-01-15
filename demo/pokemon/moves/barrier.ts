import { Codex, Move, power, register } from "../index.ts";

export const Barrier: Move = register<Move>((C: Codex) => ({
  name: "Barrier",
  description: "The user throws up a sturdy wall that sharply raises its Defense stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stages: { defense: 2 },
}));
