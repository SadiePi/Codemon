import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const SweetScent: Move = loader.register<Move>(P => ({
  name: "Sweet Scent",
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: { position: "Adjacent", alignment: "Foe" },
  makesContact: false,
  stages: { evasion: -2 },
}));
