import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";

export const SweetScent: Move = loader.register<Move>((C: Codex) => ({
  name: "Sweet Scent",
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent Foe",
  makesContact: false,
  stages: { evasion: -2 },
}));
