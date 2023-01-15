import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const SonicBoom: Move = loader.register<Move>(P => ({
  name: "Sonic Boom",
  description: "The target is hit with a destructive shock wave that always inflicts 20 HP damage.",
  type: P.Types.Normal,
  category: "Special",
  pp: 20,
  attack: power(20),
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  hp: -20,
}));
