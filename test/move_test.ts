import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import C, {
  DamageCategory,
  MoveInfo,
  Move,
  TC,
  Codemon,
} from "../src/base/index.ts";

Deno.test("Tackle basic info", () => {
  const Tackle1 = new Move({} as Codemon, C.Moves.Tackle);

  assertEquals(Tackle1.args.type.immunities.length, 1, "Wrong immunity count");
  assertEquals(Tackle1.args.type.immunities[0].name, "Ghost", "Wrong immunity");
  assertEquals(Tackle1.args.type.weaknesses.length, 1, "Wrong weakness count");
  assertEquals(
    Tackle1.args.type.weaknesses[0].name,
    "Fighting",
    "Wrong weakness"
  );
  assertNotEquals(Tackle1.PP.Boost(), 0, "Boost 1 failed");
  assertNotEquals(Tackle1.PP.Boost(), 0, "Boost 2 failed");
  assertNotEquals(Tackle1.PP.Boost(), 0, "Boost 3 failed");
  assertEquals(Tackle1.PP.Boost(), 0, "Boost 4 didn't fail");
  assertEquals(Tackle1.PP.max, 56, `Max PP is ${Tackle1.PP.max}, not 56`);
});
