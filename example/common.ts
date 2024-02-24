import P, { ICodemon } from "../codex/pokemon/mod.ts";

/** Unofficial official mascot of Codemon */
export const iBulby: ICodemon = {
  name: "Bulby",
  species: P.Species.Bulbasaur,
  gender: P.Genders.Male,
  nature: P.Natures.Quiet,
  stats: {
    level: 15,
    hp: { individualValue: 0, effortValue: 0 },
    attack: { individualValue: 0, effortValue: 0 },
    defense: { individualValue: 0, effortValue: 0 },
    specialAttack: { individualValue: 0, effortValue: 0 },
    specialDefense: { individualValue: 0, effortValue: 0 },
    speed: { individualValue: 0, effortValue: 0 },
  },
  moves: [P.Moves.Tackle, P.Moves.RazorLeaf, P.Moves.StunSpore, P.Moves.SolarBeam],
  ability: 0,
};

/** https://bulbapedia.bulbagarden.net/wiki/Stat#Example_2 */
export const iKibble: ICodemon = {
  name: "Kibble",
  species: P.Species.Garchomp,
  gender: P.Genders.Female,
  nature: P.Natures.Adamant,
  stats: {
    level: 78,
    hp: { individualValue: 24, effortValue: 74 },
    attack: { individualValue: 12, effortValue: 190 },
    defense: { individualValue: 30, effortValue: 91 },
    specialAttack: { individualValue: 16, effortValue: 48 },
    specialDefense: { individualValue: 23, effortValue: 84 },
    speed: { individualValue: 5, effortValue: 23 },
  },
  ability: "hidden",
};

export const iBigBoi: ICodemon = {
  name: "Big Boi",
  species: P.Species.Garchomp,
  stats: { level: 255 },
};

export const iGlassCannon: ICodemon = {
  name: "Glass Cannon",
  species: P.Species.Bulbasaur,
  stats: {
    level: 15,
    hp: { individualValue: 0, effortValue: 0 },
    attack: { individualValue: 31, effortValue: 255, stage: 6 },
    speed: { individualValue: 31, effortValue: 255, stage: 6 },
  },
};
