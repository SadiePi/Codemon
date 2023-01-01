import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Earthquake: Move = dexBuilder.register<Move>(() => ({
  name: "Earthquake",
  description: "The user sets off an earthquake that strikes every Pokémon around it.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  attack: power(100),
  target: "Every Adjacent",
  makesContact: false,
}));
