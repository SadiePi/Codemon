import { assertEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";
import { spawn } from "../src/base/index.ts";
import { iKibble } from "./common.ts";

Deno.test({
  // https://bulbapedia.bulbagarden.net/wiki/Stat#Example_2
  name: "Bulbapedia/Stat - Example 2",
  fn: () => {
    const kibble = spawn(iKibble);
    kibble.stats.defense.modifyStage(2);
    console.log(kibble.toString());
    assertEquals(kibble.stats.hp.value, 289);
    assertEquals(kibble.stats.attack.value, 278);
    assertEquals(kibble.stats.defense.value, 193);
    assertEquals(kibble.stats.specialAttack.value, 135);
    assertEquals(kibble.stats.specialDefense.value, 171);
    assertEquals(kibble.stats.speed.value, 171);
    kibble.stats.defense.resetStage();
  },
});
