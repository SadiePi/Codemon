import C from "../src/base/index.ts";
import { Codemon } from "../src/core/index.ts";

const bulby = new Codemon({
  species: C.Species.Bulbasaur,
});

console.log(bulby.stats.HP.value());
