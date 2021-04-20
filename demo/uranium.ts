import * as T from "../standard.ts";

// Define the Nuclear type and its relationship to other types
let TypeNuclear = T.TypeNone;
TypeNuclear = {
  weaknesses: [
    T.TypeNormal,
    T.TypeFire,
    T.TypeFighting,
    T.TypeWater,
    T.TypeFlying,
    T.TypeGrass,
    T.TypeElectric,
    T.TypeGround,
    T.TypePsychic,
    T.TypeRock,
    T.TypeIce,
    T.TypeBug,
    T.TypeDragon,
    T.TypeGhost,
    T.TypeDark,
    T.TypeSteel,
    T.TypeFairy,
    T.TypePoison,
  ],
  resistances: [TypeNuclear],
  immunities: [],
};
const nuclearWeaknesses = [
  T.TypeNormal,
  T.TypeFire,
  T.TypeFighting,
  T.TypeWater,
  T.TypeFlying,
  T.TypeGrass,
  T.TypeElectric,
  T.TypeGround,
  T.TypePsychic,
  T.TypeRock,
  T.TypeIce,
  T.TypeBug,
  T.TypeDragon,
  T.TypeGhost,
  T.TypeDark,
  T.TypeFairy,
  T.TypePoison,
];
nuclearWeaknesses.forEach((type) => {
  type.weaknesses.push(TypeNuclear);
});
T.TypeSteel.resistances.push(TypeNuclear);

// Define the Nucleon species
const SpeciesNucleon: T.Species = {
  name: "Nucleon",
  //graphics: Graphics,
  type1: TypeNuclear,
  type2: T.TypeNone,
  //normalAbility1: AbilityAtomize,
  //specialAbility: AbilityGeigerSense,
  sexRatio: 7 / 8,
  catchRate: 45,
  eggCycles: 120,
  height: 0.7,
  weight: 21.5,
  baseExperienceYield: 184,
  experienceGroup: T.expGroupMedFast,
  //bodyStyle: BodyStyle,
  //footprint: Footprint,
  //typedexColor: TypedexColor,
  baseFriendship: 35,
  baseHP: 70,
  baseAttack: 55,
  baseDefense: 85,
  baseSpecialAttack: 115,
  baseSpecialDefense: 115,
  baseSpeed: 90,
  HPEVYield: 0,
  attackEVYield: 0,
  defenseEVYield: 0,
  specialAttackEVYield: 1,
  specialDefenseEVYield: 1,
  speedEVYield: 0,
  //learnset: Learnset
};

// Define an individual Nucleon named Nuke
const nuke = new T.Typemon({ species: SpeciesNucleon, name: "Nuke" });
console.log(`${nuke}`);
