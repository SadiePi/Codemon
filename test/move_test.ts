import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import C, { Move } from "../src/base/index.ts";
import { chompy } from "./codemon_test.ts";

Deno.test("Tackle basic info", () => {
  const Tackle1 = new Move({ self: chompy, info: C.Moves.Tackle });

  assertEquals(Tackle1.info.type.immunities.length, 1, "Wrong immunity count");
  assertEquals(Tackle1.info.type.immunities[0].name, "Ghost", "Wrong immunity");
  assertEquals(Tackle1.info.type.weaknesses.length, 1, "Wrong weakness count");
  assertEquals(
    Tackle1.info.type.weaknesses[0].name,
    "Fighting",
    "Wrong weakness"
  );
  assertNotEquals(Tackle1.PP.Boost(), 0, "Boost 1 failed");
  assertNotEquals(Tackle1.PP.Boost(), 0, "Boost 2 failed");
  assertNotEquals(Tackle1.PP.Boost(), 0, "Boost 3 failed");
  assertEquals(Tackle1.PP.Boost(), 0, "Boost 4 didn't fail");
  assertEquals(Tackle1.PP.max, 56, `Max PP is ${Tackle1.PP.max}, not 56`);
});

Deno.test("Tackle usage", () => {
  console.log();

  console.log(chompy.stats.hp.current);
  console.log(chompy.moves);
  const mu = chompy.moves[0].Use(chompy, false);
  mu.random = 0.85;
  console.log(mu);
  const ur = chompy.RecieveMove(mu);
  console.log(ur.damage);
  console.log(chompy.stats.hp.current);
});
