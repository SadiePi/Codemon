import { Codex, Move, register } from "../index.ts";

export const SweetScent: Move = register<Move>((C: Codex) => ({
  name: "Sweet Scent",
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent Foe",
  makesContact: false,
  stages: { evasion: -2 },
}));
