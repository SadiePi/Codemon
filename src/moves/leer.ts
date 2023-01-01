import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Leer: Move = preload.register<Move>((C: Codex) => ({
  name: "Leer",
  description: "The user gives opposing Pokémon an intimidating leer that lowers the Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { defense: -1 },
}));
