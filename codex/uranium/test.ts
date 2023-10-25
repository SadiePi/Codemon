import U, { Codemon } from "./mod.ts";

// Define an individual Nucleon named Nuke
const nuke = new Codemon({
  name: "Nuke",
  species: U.Species.Nucleon,
  moves: [U.Moves.Tackle],
  stats: { level: 100, hp: { individualValue: 31, effortValue: 255 } },
});

console.log(`${nuke.stats.hp.value()}`);
