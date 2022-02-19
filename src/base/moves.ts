import C, { DamageCategory, MoveInfo, TC } from "./index.ts";

export const Tackle: MoveInfo = {
  name: "Tackle",
  type: C.Types.Normal,
  basePP: 35, // max 56
  basePower: 40,
  priority: 0,
  baseAccuracy: 100,
  makesContact: true,
  criticalHitStage: 0,
  damageCategory: DamageCategory.Physical,
  criticalHitProbabilityMultiplier: 1,
  targetingCategory: TC.Adjacent,
};

export default {
  Tackle,
};
