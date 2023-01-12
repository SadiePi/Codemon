import { Codex, Move, power } from "../index.ts";
import loader from "../loader.ts";

export const Barrier: Move = loader.register<Move>((C: Codex) => ({
  name: "Barrier",
  description: "The user throws up a sturdy wall that sharply raises its Defense stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stages: { defense: 2 },
}));
