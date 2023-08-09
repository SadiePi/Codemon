// these are the default settings for the most recent generation of Pokémon
// best practice for changing these is with ./loader.ts in your Codex

import { TraditionalBBP } from "./battle/traditional.ts";
import { SpawnParams } from "./codemon.ts";
import { Decider } from "./decision.ts";
import { Move } from "./move.ts";
import { Nature } from "./stats.ts";
import { Strategy } from "./trainer.ts";

// be warned, sanity checks are NOT performed on these values (half lazy, half fun)
export const config = {
  locale: "en_US",
  stats: {
    maxIV: 32,
    maxEV: 255,

    maxStage: 6,
    minStage: -6,
    allowHPStage: false,

    natureEffect: 0.1,
  },
  moves: {
    maxPPBoosts: 3,
    ppBoostMultiplier: 0.2,

    criticalMultiplier: 1.5,
    multitargetMultiplier: 0.75,
    stabMultiplier: 1.5,
    minRandomMultiplier: 0.85,
    maxRandomMultiplier: 1,
  },
  codemon: {
    limitDamageToRemainingHP: true,
  },
  battle: {
    traditional: {
      shakeChecks: 4,
    },
  },
  branding: {
    mon: "Codemon", // e.g. "Pokémon"
  },

  struggle: {} as Move,
  wild: {} as Strategy<TraditionalBBP>,
  randomNature: {} as Decider<Nature, SpawnParams>,
};

export function isInitialized() {
  return !!config.wild && !!config.randomNature && !!config.struggle;
}
