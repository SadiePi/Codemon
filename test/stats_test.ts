import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import C, { Codemon, Female } from "../src/base/index.ts";

Deno.test({
  name: "Bulbapedia/Stat - Example 2",
  fn: () => {
    console.log();
    const chompy = new Codemon({
      species: C.Species.Garchomp,
      name: "Noam Chompy",
      sex: Female,
      level: 78,
      nature: C.Nature.Adamant,
      stats: {
        HP: {
          individualValue: 24,
          effortValue: 74,
        },
        Attack: {
          individualValue: 12,
          effortValue: 190,
        },
        Defense: {
          individualValue: 30,
          effortValue: 91,
        },
        SpecialAttack: {
          individualValue: 16,
          effortValue: 48,
        },
        SpecialDefense: {
          individualValue: 23,
          effortValue: 84,
        },
        Speed: {
          individualValue: 5,
          effortValue: 23,
        },
      },
    });
    chompy.stats.Defense.modifyStage(2);
    console.log(chompy.toString());
    assertEquals(chompy.stats.HP.value(), 289);
    assertEquals(chompy.stats.Attack.value(false), 278);
    assertEquals(chompy.stats.Defense.value(false), 193);
    assertEquals(chompy.stats.SpecialAttack.value(false), 135);
    assertEquals(chompy.stats.SpecialDefense.value(false), 171);
    assertEquals(chompy.stats.Speed.value(false), 171);
  },
});
