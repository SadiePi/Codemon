export default {
  locale: "en_US",
  codemon: {
    stats: {
      maxIV: 32,
      maxEV: 255,
      maxStage: 6,
      minStage: -6,
      allowHPStage: false,
    },
    moves: {
      maxPPBoosts: 3,
      ppBoostMultiplier: 0.2,
      criticalMultiplier: 1.5,
      multitargetMultiplier: 0.75,
    },
    nature: {
      statEffect: 0.1,
    },
  },
} as const;
