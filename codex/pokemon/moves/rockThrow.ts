import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const RockThrow: Move = loader.register<Move>(P => ({
  name: "Rock Throw",
  description: "The user picks up and throws a small rock at the target to attack.",
  type: P.Types.Rock,
  category: "Physical",
  target: { position: "Adjacent" },
  makesContact: false,
  pp: 15, // max 24
  attack: power(50),
  accuracy: 90,
}));
