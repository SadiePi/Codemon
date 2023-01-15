import { Codex, Move, register } from "../index.ts";

export const AcidArmor: Move = register<Move>((C: Codex) => ({
  name: "Acid Armor",
  description: "The user alters its cellular structure to liquefy itself, sharply raising its Defense stat.",
  type: C.Types.Poison,
  category: "Status",
  pp: 20,
  target: "Self",
  makesContact: false,
  stages: { defense: 2 },
}));
