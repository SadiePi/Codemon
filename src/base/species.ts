// deno-lint-ignore-file no-unused-vars

import { Species } from "../core/index.ts"
import Type from "./types.ts"
import Exp from "./experience.ts"
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
  experienceGroup: Exp.medSlow,
  baseFriendship: 70,
  baseStats: {
    HP: 45,
    Attack: 49,
    Defense: 49,
    SpecialAttack: 65,
    SpecialDefense: 65,
    Speed: 45,
  },
  evYields: { SpecialAttack: 1 },
}
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
    HP: 108,
    Attack: 130,
    Defense: 95,
    SpecialAttack: 80,
    SpecialDefense: 85,
    Speed: 102,
  },
  evYields: {
    HP: 0,
    Attack: 0,
    Defense: 0,
    SpecialAttack: 0,
    SpecialDefense: 0,
    Speed: 0,
  },
  //learnset: Learnset
}

export default {
  Bulbasaur,
  Garchomp
}