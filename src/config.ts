// these are the default settings for the most recent generation of Pokémon
// best practice for changing these is with ./mod.ts in your Codex

import { TraditionalBBP } from "./battle/traditional.ts";
import { ICodemon } from "./codemon.ts";
import { Decider, range } from "./decision.ts";
import { Locale } from "./locale.ts";
import { Move } from "./move.ts";
import { Nature } from "./stats.ts";
import { Strategy } from "./trainer.ts";

// be warned, sanity checks are NOT performed on these values (half lazy, half fun)
export const config = {
  stats: {
    maxLevel: 100,

    maxIV: 32,
    maxEV: 255,

    maxStage: 6,
    minStage: -6,
    allowHPStage: false,

    natureBuff: 0.1,
    natureNerf: 0.1,
  },
  moves: {
    maxPPBoosts: 3,
    ppBoostMultiplier: 0.2,

    randomMultiplier: range(0.85, 1),
    criticalMultiplier: 1.5,
    multitargetMultiplier: 0.75,
    stabMultiplier: 1.5,
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
  randomNature: {} as Decider<Nature, ICodemon>,
  locale: {} as Locale,
};

export function isInitialized() {
  return !!config.wild && !!config.randomNature && !!config.struggle && !!config.locale;
}
