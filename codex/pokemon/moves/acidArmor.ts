import { Move } from "../index.ts";
import { loader } from "../loader.ts"

export const AcidArmor: Move = loader.register<Move>(P => ({
  name: "Acid Armor",
  description: "The user alters its cellular structure to liquefy itself, sharply raising its Defense stat.",
  type: P.Types.Poison,
  category: "Status",
  pp: 20,
  target: "Self",
  makesContact: false,
  stages: { defense: 2 },
}));
