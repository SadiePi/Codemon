import C, { Codemon } from "../src/base/index.ts";
import { Battle } from "../src/core/battle.ts";

/*Deno.test({
  name: "WildBattle",
  fn: async () => {*/
console.log();
const bulby = new Codemon({
  species: C.Species.Bulbasaur,
  name: "Bulby",
  moves: [C.Moves.Tackle],
  level: 25,
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
const glass = new Codemon({
  species: C.Species.Bulbasaur,
  name: "Glass Cannon",
  moves: [C.Moves.Tackle],
  level: 2,
  stats: {
    speed: {
      individualValue: 31,
      effortValue: 255,
    },
    attack: {
      individualValue: 31,
      effortValue: 255,
    },
  },
});

new Battle({ combatants: [bulby, chompy, glass] }).play();
/*},
});
*/
