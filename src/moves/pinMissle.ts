import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const PinMissle: Move = dexBuilder.register<Move>(() => ({
  name: "Pin Missile",
  description: "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row.",
  type: C.Types.Bug,
  category: "Physical",
  pp: 20,
  attack: power(25),
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: false,
  // hitAgain: (hitsSoFar: number) => {
  //   if (hitsSoFar === 1) return 1;
  //   if (hitsSoFar === 2) return 0.65;
  //   if (hitsSoFar === 3) return 0.3;
  //   if (hitsSoFar === 4) return 0.15;
  //   return 0;
  // },
}));
// TODO multihit moves
