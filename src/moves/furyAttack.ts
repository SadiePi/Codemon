import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const FuryAttack = moves.register(() => ({
  name: "Fury Attack",
  description: "The target is jabbed repeatedly with a horn or beak two to five times in a row.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  // hitAgain: (hitsSoFar: number) => {
  //   if (hitsSoFar === 1) return 1;
  //   if (hitsSoFar === 2) return 0.65;
  //   if (hitsSoFar === 3) return 0.3;
  //   if (hitsSoFar === 4) return 0.15;
  //   return 0;
  // },
}));
// TODO multihit
