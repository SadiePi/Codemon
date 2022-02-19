import C, { Codemon, Female } from "../src/base/index.ts";

export const chompy = new Codemon({
  species: C.Species.Garchomp,
  name: "Noam Chompy",
  sex: Female,
  level: 78,
  nature: C.Nature.Adamant,
  stats: {
    HP: {
      individualValue: 24,
      effortValue: 74,
    },
    Attack: {
      individualValue: 12,
      effortValue: 190,
    },
    Defense: {
      individualValue: 30,
      effortValue: 91,
    },
    SpecialAttack: {
      individualValue: 16,
      effortValue: 48,
    },
    SpecialDefense: {
      individualValue: 23,
      effortValue: 84,
    },
    Speed: {
      individualValue: 5,
      effortValue: 23,
    },
  },
});
