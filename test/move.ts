import { assertEquals } from "./_common.ts";
import { PPScheme } from "../codex/pokemon/mod.ts";

Deno.test("PP Scheme", () => {
  const pp = new PPScheme(10);

  assertEquals(pp.current, 10);
  assertEquals(pp.max, 10);
  assertEquals(pp.boosts, 0);

  assertEquals(pp.use(), true);
  assertEquals(pp.current, 9);

  assertEquals(pp.use(5), true);
  assertEquals(pp.current, 4);
  assertEquals(pp.use(5), false);
  assertEquals(pp.current, 4);

  assertEquals(pp.restore(3), 3);
  assertEquals(pp.current, 7);
  assertEquals(pp.restore(5), 3);
  assertEquals(pp.current, 10);
  assertEquals(pp.restore(5), 0);
  assertEquals(pp.current, 10);
  assertEquals(pp.use(10), true);
  assertEquals(pp.restore(), 10);

  assertEquals(pp.canBoost(), true);
  assertEquals(pp.boost(), 2);
  assertEquals(pp.boosts, 1);
  assertEquals(pp.max, 12);
  assertEquals(pp.current, 12);
  assertEquals(pp.use(1), true);
  assertEquals(pp.boost(), 2);
  assertEquals(pp.max, 14);
  assertEquals(pp.current, 13);
  assertEquals(pp.boost(), 2);
  assertEquals(pp.max, 16);
  assertEquals(pp.current, 15);
  assertEquals(pp.canBoost(), false);
  assertEquals(pp.boost(), 0);
  assertEquals(pp.boosts, 3);
  assertEquals(pp.max, 16);
});