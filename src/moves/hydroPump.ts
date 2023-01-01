import { Codex, dexBuilder, power, Move } from "../index.ts";

export const HydroPump: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Hydro Pump",
  description: "The target is blasted by a huge volume of water launched under great pressure.",
  type: C.Types.Water,
  category: "Special",
  pp: 5,
  attack: power(110),
  accuracy: 80,
  target: "Any Adjacent",
  makesContact: false,
}));
