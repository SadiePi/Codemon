import C, { Codemon } from "../src/base/index.ts";

const bulby = new Codemon({
  species: C.Species.Bulbasaur,
});

console.log(bulby.stats.HP.value());
