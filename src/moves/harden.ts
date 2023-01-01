import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Harden: Move = preload.register<Move>((C: Codex) => ({
  name: "Harden",
  description: "The user stiffens all the muscles in its body to raise its Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
  stages: { defense: 1 },
}));
