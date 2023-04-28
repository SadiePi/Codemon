import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Peck: Move = loader.register<Move>(P => ({
  name: "Peck",
  description: "The target is jabbed with a sharply pointed beak or horn.",
  type: P.Types.Flying,
  category: "Physical",
  pp: 35,
  attack: power(35),
  target: "Any",
  makesContact: true,
}));
