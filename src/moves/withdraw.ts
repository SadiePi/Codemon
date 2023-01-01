import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Withdraw: Move = dexBuilder.register<Move>(() => ({
  name: "Withdraw",
  description: "The user withdraws its body into its hard shell, raising its Defense stat.",
  type: C.Types.Water,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stages: { defense: 1 },
}));
