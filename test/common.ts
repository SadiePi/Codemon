import C, { Female, ICodemon, TraditionalBattle } from "../src/base/index.ts";

export const iChompy: ICodemon<TraditionalBattle> = {
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
};

export const iBigBoi: ICodemon<TraditionalBattle> = {
  species: C.Species.Garchomp,
  name: "Big Boi",
  level: 100,
};

export const iBulby: ICodemon<TraditionalBattle> = {
  species: C.Species.Bulbasaur,
  name: "Bulby",
  level: 15,
};

export const iGlassCannon: ICodemon<TraditionalBattle> = {
  species: C.Species.Bulbasaur,
  name: "Glass Cannon",
  level: 2,
  stats: {
    speed: {
      individualValue: 31,
      effortValue: 255,
    },
    attack: {
      individualValue: 255,
      effortValue: 255,
    },
  },
};
