import C, { Codemon } from "../src/base/index.ts";
import { WildBattle } from "../src/core/battle.ts";

Deno.test({
  name: "WildBattle",
  fn: async () => {
    const bulby = new Codemon({
      species: C.Species.Bulbasaur,
      moves: [C.Moves.Tackle],
    });
    const chompy = new Codemon({
      species: C.Species.Garchomp,
      moves: [C.Moves.Tackle],
    });
    await new WildBattle(bulby, chompy).play();
  },
});
