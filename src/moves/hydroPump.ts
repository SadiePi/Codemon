import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const HydroPump: Move = preload.register<Move>((C: Codex) => ({
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
