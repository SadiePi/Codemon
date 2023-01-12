import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";

export const Toxic: Move = loader.register<Move>((C: Codex) => ({
  name: "Toxic",
  description: "A move that leaves the target badly poisoned. Its poison damage worsens every turn.",
  type: C.Types.Poison,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.BadlyPoisoned,
}));
