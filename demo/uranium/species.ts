// Ensure that the uranium demo entries are enabled in ../src/types/index.ts and ../src/species/index.ts

import C, { Species, weighted } from "../../src/index.ts";
import dexBuilder from "../../src/core/codex.ts";

// Define the Nucleon species, a Nuclear-type eeveelution
export const Nucleon: Species = dexBuilder.register<Species>(() => ({
  name: "Nucleon",
  description: "A radioactive eeveelution.",
  //graphics: Graphics,
  types: [C.Types.Nuclear],
  abilities: {
    normal: [{} as any],
    hidden: {} as any,
  },
  //normalAbility1: AbilityAtomize,
  //specialAbility: AbilityGeigerSense,
  genders: weighted([
    [C.Genders.Male, 7],
    [C.Genders.Female, 1],
  ]),
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
  bodyType: "Quadruped",
  learnset: {},
  evolutions: [],
}));
