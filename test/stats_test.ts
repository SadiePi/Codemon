import { assertEquals } from "./common.ts";
import { spawn } from "../src/index.ts";
import { iKibble } from "./common.ts";

Deno.test({
  name: "BP/Stat#Example_2", // https://bulbapedia.bulbagarden.net/wiki/Stat#Example_2",
  fn: () => {
    const kibble = spawn(iKibble);
    kibble.stats.defense.stage.modify(2);
    assertEquals(kibble.stats.hp.current, 289);
    assertEquals(kibble.stats.attack.value(), 278);
    assertEquals(kibble.stats.defense.value(), 193);
    assertEquals(kibble.stats.specialAttack.value(), 135);
    assertEquals(kibble.stats.specialDefense.value(), 171);
    assertEquals(kibble.stats.speed.value(), 171);
  },
});
