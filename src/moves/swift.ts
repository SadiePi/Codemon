import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Swift: Move = dexBuilder.register<Move>(() => ({
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
