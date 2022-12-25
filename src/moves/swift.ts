import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Swift = moves.register(() => ({
  name: "Swift",
  description: "Star-shaped rays are shot at the opposing Pokémon. This attack never misses.",
  type: C.Types.Normal,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 20,
  power: 60,
  makesContact: false,
}));
// TODO swift
