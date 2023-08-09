import C, { SpawnParams } from "../codex/pokemon/mod.ts";
export { assertEquals, assertNotEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";

// https://bulbapedia.bulbagarden.net/wiki/Stat#Example_2
export const iKibble: SpawnParams = {
  name: "Kibble",
  species: C.Species.Garchomp,
  gender: C.Genders.Female,
  nature: C.Natures.Adamant,
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

export const iBigBoi: SpawnParams = {
  name: "Big Boi",
  species: C.Species.Garchomp,
  stats: { level: 255 },
};

export const iBulby: SpawnParams = {
  name: "Bulby",
  species: C.Species.Bulbasaur,
  gender: C.Genders.Male,
  nature: C.Natures.Quiet,
  stats: {
    level: 15,
    hp: { individualValue: 0, effortValue: 0 },
    attack: { individualValue: 0, effortValue: 0 },
    defense: { individualValue: 0, effortValue: 0 },
    specialAttack: { individualValue: 0, effortValue: 0 },
    specialDefense: { individualValue: 0, effortValue: 0 },
    speed: { individualValue: 0, effortValue: 0 },
  },
  moves: [C.Moves.Tackle, C.Moves.RazorLeaf, C.Moves.StunSpore, C.Moves.SolarBeam],
  ability: 0,
};

export const iGlassCannon: SpawnParams = {
  name: "Glass Cannon",
  species: C.Species.Bulbasaur,
  stats: {
    level: 15,
    hp: { individualValue: 0, effortValue: 0 },
    attack: { individualValue: 31, effortValue: 255, stage: 6 },
    speed: { individualValue: 31, effortValue: 255, stage: 6 },
  },
};
