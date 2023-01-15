import { Codemon, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const SeismicToss: Move = loader.register<Move>(P => ({
  name: "Seismic Toss",
  description: "The target is thrown using the power of gravity. It inflicts damage equal to the user's level.",
  type: P.Types.Fighting,
  category: "Physical",
  pp: 20,
  target: "Any Adjacent",
  makesContact: true,
  hp: ({ target }) => (target instanceof Codemon ? target.stats.level : 0),
}));
