import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const WaterGun: Move = loader.register<Move>(P => ({
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: P.Types.Water,
  category: "Special",
  pp: 25,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
}));
