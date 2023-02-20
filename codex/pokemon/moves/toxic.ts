import { Move } from "../index.ts";
import loader from "../loader.ts"

export const Toxic: Move = loader.register<Move>(P => ({
  name: "Toxic",
  description: "A move that leaves the target badly poisoned. Its poison damage worsens every turn.",
  type: P.Types.Poison,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: P.Statuses.BadlyPoisoned,
}));
