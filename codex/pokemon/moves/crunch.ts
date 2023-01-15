import { power, Move, chance } from "../index.ts";
import { loader } from "../loader.ts"

export const Crunch: Move = loader.register<Move>(P => ({
  name: "Crunch",
  description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat.",
  type: P.Types.Dark,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
  stages: chance(1 / 5, { defense: -1 }),
}));
