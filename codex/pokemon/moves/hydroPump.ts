import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const HydroPump: Move = loader.register<Move>(P => ({
  name: "Hydro Pump",
  description: "The target is blasted by a huge volume of water launched under great pressure.",
  type: P.Types.Water,
  category: "Special",
  pp: 5,
  attack: power(110),
  accuracy: 80,
  target: { position: "Adjacent" },
  makesContact: false,
}));
