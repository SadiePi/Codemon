export default {
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
    randomMultiplier: 0.85,
    stabMultiplier: 1.5,
    minRandomMultiplier: 0.85,
    maxRandomMultiplier: 1,
  },
  codemon: {
    limitDamageToRemainingHP: false,
  },
  battle: {},
} as const;
