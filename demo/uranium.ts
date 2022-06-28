import C, { Codemon, Species, Type } from "../src/base/index.ts";

// Define the Nuclear type and its relationship to other types
const TypeNuclear = {} as Type;
TypeNuclear.weaknesses = [
  C.Types.Normal,
  C.Types.Fire,
  C.Types.Fighting,
  C.Types.Water,
  C.Types.Flying,
  C.Types.Grass,
  C.Types.Electric,
  C.Types.Ground,
  C.Types.Psychic,
  C.Types.Rock,
  C.Types.Ice,
  C.Types.Bug,
  C.Types.Dragon,
  C.Types.Ghost,
  C.Types.Dark,
  C.Types.Steel,
  C.Types.Fairy,
  C.Types.Poison,
];
TypeNuclear.resistances = [TypeNuclear];
TypeNuclear.immunities = [];

[
  C.Types.Normal,
  C.Types.Fire,
  C.Types.Fighting,
  C.Types.Water,
  C.Types.Flying,
  C.Types.Grass,
  C.Types.Electric,
  C.Types.Ground,
  C.Types.Psychic,
  C.Types.Rock,
  C.Types.Ice,
  C.Types.Bug,
  C.Types.Dragon,
  C.Types.Ghost,
  C.Types.Dark,
  C.Types.Fairy,
  C.Types.Poison,
].forEach(type => {
  type.weaknesses.push(TypeNuclear);
});
C.Types.Steel.resistances.push(TypeNuclear);

// Define the Nucleon species
const SpeciesNucleon: Species = {
  name: "Nucleon",
  //graphics: Graphics,
  types: [TypeNuclear],
  //normalAbility1: AbilityAtomize,
  //specialAbility: AbilityGeigerSense,
  sexRatio: 7 / 8,
  catchRate: 45,
  eggCycles: 120,
  height: 0.7,
  weight: 21.5,
  baseExperienceYield: 184,
  experienceGroup: C.Experience.MedFast,
  //bodyStyle: BodyStyle,
  //footprint: Footprint,
  //typedexColor: TypedexColor,
  baseFriendship: 35,
  baseStats: {
    hp: 70,
    attack: 55,
    defense: 85,
    specialAttack: 115,
    specialDefense: 115,
    speed: 90,
  },
  evYields: {
    specialAttack: 1,
    specialDefense: 1,
  },
  //learnset: Learnset
};

// Define an individual Nucleon named Nuke
const nuke = new Codemon({ species: SpeciesNucleon, name: "Nuke", moves: [C.Moves.Tackle] });
console.log(`${nuke.stats.hp.value()}`);
