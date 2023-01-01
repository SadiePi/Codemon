import { Codex, Move } from "../index.ts";
import preload from "../preload.ts";

export const Withdraw: Move = preload.register<Move>((C: Codex) => ({
  name: "Withdraw",
  description: "The user withdraws its body into its hard shell, raising its Defense stat.",
  type: C.Types.Water,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stages: { defense: 1 },
}));
