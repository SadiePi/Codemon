import { Codex, dexBuilder, Move } from "../index.ts";

export const Withdraw: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Withdraw",
  description: "The user withdraws its body into its hard shell, raising its Defense stat.",
  type: C.Types.Water,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stages: { defense: 1 },
}));
