import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { chompy } from "./codemon_test.ts";

Deno.test({
  name: "Bulbapedia/Stat - Example 2",
  fn: () => {
    console.log();

    chompy.stats.Defense.modifyStage(2);
    console.log(chompy.toString());
    assertEquals(chompy.stats.HP.value(), 289);
    assertEquals(chompy.stats.Attack.value(false), 278);
    assertEquals(chompy.stats.Defense.value(false), 193);
    assertEquals(chompy.stats.SpecialAttack.value(false), 135);
    assertEquals(chompy.stats.SpecialDefense.value(false), 171);
    assertEquals(chompy.stats.Speed.value(false), 171);
    chompy.stats.Defense.resetStage();
  },
});
