import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Slam: Move = loader.register<Move>(P => ({
  name: "Slam",
  description: "The target is slammed with a long tail, vines, or the like to inflict damage.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(80),
  accuracy: 75,
  target: { position: "Adjacent" },
  makesContact: true,
}));
