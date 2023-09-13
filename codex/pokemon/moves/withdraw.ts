import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Withdraw: Move = loader.register<Move>(P => ({
  name: "Withdraw",
  description: "The user withdraws its body into its hard shell, raising its Defense stat.",
  type: P.Types.Water,
  category: "Status",
  pp: 40, // max 64
  target: { alignment: "Self" },
  makesContact: false,
  stages: { defense: 1 },
}));
