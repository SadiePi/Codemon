import { Codex, power, Move, register } from "../index.ts";

export const Swift: Move = register<Move>((C: Codex) => ({
  name: "Swift",
  description: "Star-shaped rays are shot at the opposing Pokémon. This attack never misses.",
  type: C.Types.Normal,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 20,
  attack: power(60),
  makesContact: false,
}));
// TODO swift
