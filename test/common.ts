import C, { Codemon, Female } from "../src/base/index.ts";

export const chompy = new Codemon({
  species: C.Species.Garchomp,
  name: "Noam Chompy",
  sex: Female,
  level: 78,
  nature: C.Nature.Adamant,
  stats: {
    hp: {
      individualValue: 24,
      effortValue: 74,
    },
    attack: {
      individualValue: 12,
      effortValue: 190,
    },
    defense: {
      individualValue: 30,
      effortValue: 91,
    },
    specialAttack: {
      individualValue: 16,
      effortValue: 48,
    },
    specialDefense: {
      individualValue: 23,
      effortValue: 84,
    },
    speed: {
      individualValue: 5,
      effortValue: 23,
    },
  },
  moves: [C.Moves.Tackle],
});
