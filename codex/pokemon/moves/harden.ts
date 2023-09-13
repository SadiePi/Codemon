import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Harden: Move = loader.register<Move>(P => ({
  name: "Harden",
  description: "The user stiffens all the muscles in its body to raise its Defense stat.",
  type: P.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: { alignment: "Self" },
  makesContact: false,
  stages: { defense: 1 },
}));
