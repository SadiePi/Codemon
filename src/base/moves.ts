import { MoveInfo, TC } from "./index.ts";
import Types from "./types.ts";

export const Tackle: MoveInfo = {
  name: "Tackle",
  type: Types.Normal,
  basePP: 35, // max 56
  basePower: 40,
  priority: 0,
  baseAccuracy: 100,
  makesContact: true,
  criticalHitStage: 0,
  damageCategory: "Physical",
  criticalHitProbabilityMultiplier: 1,
  targetingCategory: TC.Adjacent,
};

export default {
  Tackle,
};
