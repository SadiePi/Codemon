import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Haze: Move = dexBuilder.register<Move>(() => ({
  name: "Haze",
  description: "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle.",
  type: C.Types.Ice,
  category: "Status",
  pp: 30, // max 48
  target: "All",
  makesContact: false,
}));
// TODO functionality
