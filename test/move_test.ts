import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { DamageCategory, IMove, Move, TC } from "../src/core/move.ts";
import Types from "../src/base/types.ts";

const ITackle: IMove = {
  name: "Tackle",
  type: Types.Normal,
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

Deno.test("Tackle basic info", () => {
  const Tackle = new Move(ITackle);

  assertEquals(Tackle.args.type.immunities.length, 1, "Wrong immunity count");
  assertEquals(Tackle.args.type.immunities[0].name, "Ghost", "Wrong immunity");
  assertEquals(Tackle.args.type.weaknesses.length, 1, "Wrong weakness count");
  assertEquals(
    Tackle.args.type.weaknesses[0].name,
    "Fighting",
    "Wrong weakness"
  );
  assertNotEquals(Tackle.PP.Boost(), 0, "Boost 1 failed");
  assertNotEquals(Tackle.PP.Boost(), 0, "Boost 2 failed");
  assertNotEquals(Tackle.PP.Boost(), 0, "Boost 3 failed");
  assertEquals(Tackle.PP.Boost(), 0, "Boost 4 didn't fail");
  assertEquals(Tackle.PP.max, 56, `Max PP is ${Tackle.PP.max}, not 56`);
});
