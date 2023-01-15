import UraniumCodex, { Species, weighted, register } from "./index.ts";

// Define the Nucleon species, a Nuclear-type eeveelution
export const Nucleon: Species = register<Species, UraniumCodex>(C => ({
  name: "Nucleon",
  description: "A radioactive eeveelution.",
  types: [C.Types.Nuclear],
  abilities: {
    normal: [C.Abilities.Atomize],
    hidden: C.Abilities.GeigerSense,
  },
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
