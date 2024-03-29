import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const SonicBoom: Move = loader.register<Move>(P => ({
  name: "Sonic Boom",
  description: "The target is hit with a destructive shock wave that always inflicts 20 HP damage.",
  type: P.Types.Normal,
  category: "Special",
  pp: 20,
  attack: power(20),
  accuracy: 90,
  target: { position: "Adjacent" },
  makesContact: false,
  hp: -20,
}));
