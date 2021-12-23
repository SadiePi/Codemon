import * as T from "../src/core/index.ts"

export const garchomp: T.Species = {
  name: "Garchomp",
  //graphics: Graphics,
  type1: T.TypeNone,
  type2: T.TypeNone,
  //normalAbility1: Ability,
  //normalAbility2: Ability,
  //specialAbility: Ability,
  sexRatio: 0.5,
  catchRate: 45,
  eggCycles: 120,
  height: 1.9,
  weight: 95.0,
  baseExperienceYield: 270,
  experienceGroup: (l: number) => (5 * Math.pow(l, 3)) / 4, // default slow
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
