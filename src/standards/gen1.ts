// deno-lint-ignore-file no-unused-vars

import { Species } from "../core/index.ts"
import Type from "./types.ts"
import Exp from "./experience.ts"

const bulbasaur: Species = {
  name: "Bulbasaur",
  type1: Type.Grass,
  type2: Type.Poison,
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
