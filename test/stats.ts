import { config, spawn } from "../codex/pokemon/mod.ts";
import { assertEquals, iKibble } from "./common.ts";

import { iBulby } from "./common.ts";

Deno.test("Stat Stages", () => {
  const bulby = spawn(iBulby);

  let changes = 0;
  bulby.stats.on("stageChange", () => changes++);

  let resets = 0;
  bulby.stats.on("stageReset", () => resets++);

  const attackStage = bulby.stats.attack.stage;

  assertEquals(attackStage.current, 0, "Stat stage didn't start at 0");
  assertEquals(attackStage.multiplier, 1, "Stat stage multiplier didn't start at 1");

  attackStage.modify(1);
  assertEquals(attackStage.current, 1, "Modifier didn't bring to 1");
  assertEquals(attackStage.multiplier, 3 / 2, "Wrong multiplier at stage 1");

  attackStage.modify(-3);
  assertEquals(attackStage.current, -2, "Modifier didn't bring to -2");
  assertEquals(attackStage.multiplier, 2 / 4, "Wrong multiplier at stage -2");

  attackStage.modify(8);
  assertEquals(attackStage.current, 6, "Modifier didn't bring to 6");
  assertEquals(attackStage.multiplier, 4, "Wrong multiplier at stage 6");

  attackStage.modify(-Infinity);
  assertEquals(attackStage.current, config.stats.minStage, "Modifier didn't bring to min");

  attackStage.modify(Infinity);
  assertEquals(attackStage.current, config.stats.maxStage, "Modifier didn't bring to max");

  attackStage.reset();
  assertEquals(attackStage.current, 0, "Stat stage didn't reset");
  assertEquals(attackStage.multiplier, 1, "Stat stage multiplier didn't reset");

  const accuracyStage = bulby.stats.accuracy.stage;

  accuracyStage.modify(1);
  assertEquals(accuracyStage.current, 1, "Modifier didn't bring to 1");
  assertEquals(accuracyStage.multiplier, 4 / 3, "Wrong multiplier at stage 1");

  accuracyStage.modify(-3);
  assertEquals(accuracyStage.current, -2, "Modifier didn't bring to -2");
  assertEquals(accuracyStage.multiplier, 3 / 5, "Wrong multiplier at stage -2");

  accuracyStage.modify(8);
  assertEquals(accuracyStage.current, 6, "Modifier didn't bring to 6");
  assertEquals(accuracyStage.multiplier, 3, "Wrong multiplier at stage 6");

  accuracyStage.reset();
  assertEquals(accuracyStage.current, 0, "Stat stage didn't reset");

  assertEquals(changes, 10, "Wrong number of stage changes");
  assertEquals(resets, 2, "Wrong number of resets");
});
Deno.test("Experience", () => {});
Deno.test("Stat Values", () => {
  const kibble = spawn(iKibble);
  assertEquals(kibble.stats.hp.max, 289);
  assertEquals(kibble.stats.attack.value(), 278);
  assertEquals(kibble.stats.defense.value(), 193);
  assertEquals(kibble.stats.specialAttack.value(), 135);
  assertEquals(kibble.stats.specialDefense.value(), 171);
  assertEquals(kibble.stats.speed.value(), 171);

  const { attack } = kibble.stats;

  attack.stage.modify(1);
  assertEquals(attack.value(true), 417);

  attack.stage.modify(5);
  assertEquals(attack.value(true), 1112);

  attack.stage.modify(-12);
  assertEquals(attack.value(true), 69);
});
