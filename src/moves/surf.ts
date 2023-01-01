import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Surf: Move = dexBuilder.register<Move>(() => ({
  name: "Surf",
  description: "The user attacks everything around it by swamping its surroundings with a giant wave.",
  type: C.Types.Water,
  category: "Special",
  pp: 15,
  attack: power(90),
  target: "Every Adjacent",
  makesContact: false,
}));
