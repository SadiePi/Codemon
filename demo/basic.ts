import C, { Codemon } from "../src/index.ts";

const bulby = new Codemon({
  species: C.Species.Bulbasaur,
  moves: [C.Moves.Tackle],
});

console.log(bulby.stats.hp.value());
