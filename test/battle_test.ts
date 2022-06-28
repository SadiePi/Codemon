import C, { Codemon, TraditionalBattle } from "../src/base/index.ts";
import { chompy } from "./common.ts";

const bulby = new Codemon({
  species: C.Species.Bulbasaur,
  name: "Bulby",
  moves: [C.Moves.Tackle],
  level: 120,
});

// const glass = new Codemon({
//   species: C.Species.Bulbasaur,
//   name: "Glass Cannon",
//   moves: [C.Moves.Tackle],
//   level: 2,
//   stats: {
//     speed: {
//       individualValue: 31,
//       effortValue: 255,
//     },
//     attack: {
//       individualValue: 255,
//       effortValue: 255,
//     },
//   },
// });

Deno.test({
  name: "Traditional Battle",
  fn: async () => {
    const battle = new TraditionalBattle([chompy, bulby]);
    battle.consoleInterface();
    const { winner } = await battle.runBattle();
    console.log();
    console.log(winner ? `${winner.name} won!` : "It's a draw!");
  },
});
