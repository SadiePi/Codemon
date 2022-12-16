import C, { Move } from "../index.ts";

export const AcidArmor: Move = {
  name: "Acid Armor",
  description: "The user alters its cellular structure to liquefy itself, sharply raising its Defense stat.",
  type: C.Types.Poison,
  category: "Status",
  pp: 20,
  target: "Self",
  makesContact: false,
  stage: { defense: 2 },
};