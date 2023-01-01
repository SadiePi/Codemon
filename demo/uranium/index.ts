// Ensure that the uranium demo entries are enabled in ../src/types/index.ts and ../src/species/index.ts

import C, { Codemon } from "../../src/index.ts";

// Define an individual Nucleon named Nuke
const nuke = new Codemon({
  name: "Nuke",
  species: C.Species.Nucleon,
  moves: [C.Moves.Tackle],
  stats: { level: 100, hp: { individualValue: 31, effortValue: 255 } },
});

console.log(`${nuke.stats.hp.value()}`);
