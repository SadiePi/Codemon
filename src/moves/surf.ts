import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Surf: Move = preload.register<Move>((C: Codex) => ({
  name: "Surf",
  description: "The user attacks everything around it by swamping its surroundings with a giant wave.",
  type: C.Types.Water,
  category: "Special",
  pp: 15,
  attack: power(90),
  target: "Every Adjacent",
  makesContact: false,
}));
