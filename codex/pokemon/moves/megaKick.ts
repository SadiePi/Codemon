import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const MegaKick: Move = loader.register<Move>(P => ({
  name: "Mega Kick",
  description: "The target is attacked by a kick launched with muscle-packed power.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 5,
  attack: power(120),
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
}));
