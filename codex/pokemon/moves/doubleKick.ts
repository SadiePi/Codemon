import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const DoubleKick: Move = loader.register<Move>(P => ({
  name: "Double Kick",
  description: "The target is quickly kicked twice in succession using both feet.",
  type: P.Types.Fighting,
  category: "Physical",
  pp: 30,
  attack: power(30),
  target: { position: "Adjacent" },
  makesContact: true,
  // hitAgain: h => h < 2,
}));
