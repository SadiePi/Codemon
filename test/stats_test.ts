import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { chompy } from "./codemon_test.ts";

Deno.test({
  name: "Bulbapedia/Stat - Example 2",
  fn: () => {
    console.log();

    chompy.stats.defense.modifyStage(2);
    console.log(chompy.toString());
    assertEquals(chompy.stats.hp.value(), 289);
    assertEquals(chompy.stats.attack.value(false), 278);
    assertEquals(chompy.stats.defense.value(false), 193);
    assertEquals(chompy.stats.specialAttack.value(false), 135);
    assertEquals(chompy.stats.specialDefense.value(false), 171);
    assertEquals(chompy.stats.speed.value(false), 171);
    chompy.stats.defense.resetStage();
  },
});
