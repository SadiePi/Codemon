import { assertEquals, assertNotEquals } from "./_common.ts";
import C, { Codemon, MoveEntry } from "../codex/pokemon/mod.ts";

Deno.test("Tackle", () => {
  const tackle = new MoveEntry({
    user: {} as Codemon,
    move: C.Moves.Tackle,
  });

  assertEquals(tackle.effects.type.immunities.length, 1, "Wrong immunity count");
  assertEquals(tackle.effects.type.immunities[0].name, "Ghost", "Wrong immunity");
  assertEquals(tackle.effects.type.weaknesses.length, 1, "Wrong weakness count");
  assertEquals(tackle.effects.type.weaknesses[0].name, "Fighting", "Wrong weakness");
  assertNotEquals(tackle.pp.boost(), 0, "Boost 1 failed");
  assertNotEquals(tackle.pp.boost(), 0, "Boost 2 failed");
  assertNotEquals(tackle.pp.boost(), 0, "Boost 3 failed");
  assertEquals(tackle.pp.boost(), 0, "Boost 4 didn't fail");
  assertEquals(tackle.pp.max, 56, `Max PP is ${tackle.pp.max}, not 56`);
});
