import C, { ICodemon } from "../src/index.ts";

export const iKibble: ICodemon = {
  species: C.Species.Garchomp,
  name: "Kibble",
  gender: C.Genders.Female,
  level: 78,
  nature: C.Natures.Adamant,
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

export const iBigBoi: ICodemon = {
  species: C.Species.Garchomp,
  name: "Big Boi",
  level: 100,
};

export const iBulby: ICodemon = {
  species: C.Species.Bulbasaur,
  name: "Bulby",
  level: 15,
};

export const iGlassCannon: ICodemon = {
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
