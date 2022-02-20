import { Species } from "../core/index.ts";
import Type from "./types.ts";
import Experience from "./experience.ts";

export const Bulbasaur: Species = {
  name: "Bulbasaur",
  types: [Type.Grass, Type.Poison],
  sexRatio: 1 / 8,
  catchRate: 45,
  eggCycles: 21, // 5397 / 257
  height: 0.7,
  weight: 6.9,
  baseExperienceYield: 64,
  experienceGroup: Experience.MedSlow,
  baseFriendship: 70,
  baseStats: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
  },
  evYields: { specialAttack: 1 },
};
// ivysaur, venusaur, ...

export const Garchomp: Species = {
  name: "Garchomp",
  //graphics: Graphics,
  types: [Type.Dragon, Type.Ground],
  //normalAbility1: Ability,
  //normalAbility2: Ability,
  //specialAbility: Ability,
  sexRatio: 0.5,
  catchRate: 45,
  eggCycles: 120,
  height: 1.9,
  weight: 95.0,
  baseExperienceYield: 270,
  experienceGroup: Experience.Slow,
  //bodyStyle: BodyStyle,
  //footprint: Footprint,
  //typedexColor: TypedexColor,
  baseFriendship: 70,
  baseStats: {
    hp: 108,
    attack: 130,
    defense: 95,
    specialAttack: 80,
    specialDefense: 85,
    speed: 102,
  },
  evYields: {
    attack: 3,
  },
  //learnset: Learnset
};

export default {
  Bulbasaur,
  Garchomp,
};
