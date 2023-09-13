import { Move, power } from "../mod.ts";
import loader from "../loader.ts";

export const Barrier: Move = loader.register<Move>(P => ({
  name: "Barrier",
  description: "The user throws up a sturdy wall that sharply raises its Defense stat.",
  type: P.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: { alignment: "Self" },
  makesContact: false,
  stages: { defense: 2 },
}));
