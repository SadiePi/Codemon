import { Move } from "../index.ts";
import loader from "../loader.ts"

export const SweetScent: Move = loader.register<Move>(P => ({
  name: "Sweet Scent",
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent Foe",
  makesContact: false,
  stages: { evasion: -2 },
}));
