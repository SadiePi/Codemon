import { Codex, Codemon, Move } from "../index.ts";
import preload from "../preload.ts";

export const SeismicToss: Move = preload.register<Move>((C: Codex) => ({
  name: "Seismic Toss",
  description: "The target is thrown using the power of gravity. It inflicts damage equal to the user's level.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  target: "Any Adjacent",
  makesContact: true,
  hp: ({ target }) => (target instanceof Codemon ? target.stats.level : 0),
}));
