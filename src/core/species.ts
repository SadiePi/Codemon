import { Stat } from "./stats.ts"
import { Codemon } from "./codemon.ts"
import { ExperienceGroup } from "./experience.ts"
import { Type } from "./type.ts"
import { Sex } from "./sex.ts"
import { BaseStats, EVYields } from "./stats.ts"

export interface Species {
  // Normal species definition information
  name: string
  //graphics: Graphics
  type1: Type
  type2?: Type
  //ability1: Ability
  //ability2?: Ability
  //specialAbility: Ability
  sexRatio: number
  catchRate: number
  eggCycles: number
  height: number
  weight: number
  baseExperienceYield: number
  experienceGroup: ExperienceGroup
  //bodyStyle: BodyStyle
  //footprint: Footprint
  //CodexColor: CodexColor
  baseFriendship: number
  baseStats: BaseStats
  evYields: EVYields
  //learnset: Learnset;

  // Calculation overrides
  setName?: (self: Codemon, newName: string) => string
  getName?: (self: Codemon, storedName: string) => string
  setSex?: (self: Codemon, newSex: Sex) => Sex
  getSex?: (self: Codemon, storedSex: Sex) => Sex
  getStat?: (
    self: Codemon,
    stat: Stat,
    normalValue: number,
    considerBattleStatus: boolean
  ) => number // TODO use this
}
