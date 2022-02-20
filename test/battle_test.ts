import C, { Codemon } from "../src/base/index.ts";
import { wildBattle } from "../src/core/battle.ts";

Deno.test({
  name: "WildBattle",
  fn: async () => {
    const bulby = new Codemon({
      species: C.Species.Bulbasaur,
      name: "Bulby",
      moves: [C.Moves.Tackle],
      level: 50,
    });
    const chompy = new Codemon({
      species: C.Species.Garchomp,
      name: "Chompy",
      moves: [C.Moves.Tackle],
      stats: {
        hp: {
          effortValue: 80,
        },
        defense: {
          individualValue: 10,
          effortValue: 50,
        },
      },
      level: 15,
    });
    wildBattle(bulby, chompy);
  },
});
