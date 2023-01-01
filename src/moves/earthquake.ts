import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Earthquake: Move = preload.register<Move>((C: Codex) => ({
  name: "Earthquake",
  description: "The user sets off an earthquake that strikes every Pokémon around it.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  attack: power(100),
  target: "Every Adjacent",
  makesContact: false,
}));
