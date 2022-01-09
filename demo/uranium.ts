import C, { Codemon, Species } from "../src/base/index.ts";

// Define the Nuclear type and its relationship to other types
let TypeNuclear = C.Types.INIT;
TypeNuclear = {
  weaknesses: [
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
  ],
  resistances: [TypeNuclear],
  immunities: [],
};
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
].forEach((type) => {
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
    HP: 70,
    Attack: 55,
    Defense: 85,
    SpecialAttack: 115,
    SpecialDefense: 115,
    Speed: 90,
  },
  evYields: {
    SpecialAttack: 1,
    SpecialDefense: 1,
  },
  //learnset: Learnset
};

// Define an individual Nucleon named Nuke
const nuke = new Codemon({ species: SpeciesNucleon, name: "Nuke" });
console.log(`${nuke.stats.HP.value()}`);
