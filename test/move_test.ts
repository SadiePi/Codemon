import { assertEquals, assertNotEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";

import C, { spawn } from "../src/index.ts";
import { iKibble } from "./common.ts";

Deno.test("Tackle basic info", () => {
  const chompy = spawn({
    moves: [C.Moves.Tackle],
    ...iKibble,
  });

  const tackle = chompy.moves[0];

  assertEquals(tackle.data.type.immunities.length, 1, "Wrong immunity count");
  assertEquals(tackle.data.type.immunities[0].name, "Ghost", "Wrong immunity");
  assertEquals(tackle.data.type.weaknesses.length, 1, "Wrong weakness count");
  assertEquals(tackle.data.type.weaknesses[0].name, "Fighting", "Wrong weakness");
  assertNotEquals(tackle.PP.Boost(), 0, "Boost 1 failed");
  assertNotEquals(tackle.PP.Boost(), 0, "Boost 2 failed");
  assertNotEquals(tackle.PP.Boost(), 0, "Boost 3 failed");
  assertEquals(tackle.PP.Boost(), 0, "Boost 4 didn't fail");
  assertEquals(tackle.PP.max, 56, `Max PP is ${tackle.PP.max}, not 56`);
});

Deno.test("Tackle usage", () => {
  // const chompy = spawn(iChompy);
  // console.log(chompy.stats.hp.current);
  // console.log(chompy.moves);
  // const mu = chompy.moves[0].actionSource.use([chompy]);
  // // mu.random = 0.85;
  // console.log(mu);
  // const ur = chompy.RecieveMove(mu);
  // console.log(ur.damage);
  // console.log(chompy.stats.hp.current);
});
