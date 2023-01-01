import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const PoisonPowder: Move = preload.register<Move>((C: Codex) => ({
  name: "Poison Powder",
  description: "The user scatters a cloud of poisonous dust that poisons the target.",
  type: C.Types.Poison,
  category: "Status",
  pp: 35, // max 56
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Poison,
}));
