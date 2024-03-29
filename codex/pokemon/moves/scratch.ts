import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Scratch: Move = loader.register<Move>(P => ({
  name: "Scratch",
  description: "Hard, pointed, sharp claws rake the target to inflict damage.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 35,
  attack: power(40),
  target: { position: "Adjacent" },
  makesContact: true,
}));
