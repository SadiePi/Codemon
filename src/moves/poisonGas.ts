import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const PoisonGas: Move = loader.register<Move>((C: Codex) => ({
  name: "Poison Gas",
  description: "A cloud of poison gas is sprayed in the face of opposing Pokémon, poisoning those it hits.",
  type: C.Types.Poison,
  target: "Every Adjacent Foe",
  category: "Status",
  pp: 40,
  accuracy: 90,
  makesContact: false,
  status: C.Statuses.Poison,
}));
