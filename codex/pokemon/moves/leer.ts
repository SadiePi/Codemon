import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Leer: Move = loader.register<Move>(P => ({
  name: "Leer",
  description: "The user gives opposing Pokémon an intimidating leer that lowers the Defense stat.",
  type: P.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { defense: -1 },
}));
