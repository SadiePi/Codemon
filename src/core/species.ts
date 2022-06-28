import { Stat } from "./stats.ts";
import Codemon from "./codemon.ts";
import { ExperienceGroup } from "./experience.ts";
import { Type } from "./type.ts";
import { Sex } from "./sex.ts";
import { BaseStats, EVYields } from "./stats.ts";
import { Nature } from "./nature.ts";

export interface Species {
  // Normal species definition information
  name: string;
  //graphics: Graphics
  types: Type[];
  //ability1: Ability
  //ability2?: Ability
  //specialAbility: Ability
  sexRatio: number;
  catchRate: number;
  eggCycles: number;
  height: number;
  weight: number;
  baseExperienceYield: number;
  experienceGroup: ExperienceGroup;
  //bodyStyle: BodyStyle
  //footprint: Footprint
  //CodexColor: CodexColor
  baseFriendship: number;
  baseStats: BaseStats;
  evYields: EVYields;
  //learnset: Learnset;

  // Calculation overrides
  overrideName?: (self: Codemon, inputName: string) => string;
  overrideSex?: (self: Codemon, inputSex: Sex) => Sex;
  overrideStatValue?: (self: Codemon, stat: Stat, inputStat: number, considerBattleStatus: boolean) => number; // TODO use this
  overrideNature?: (self: Codemon, inputNature: Nature) => Nature;
}
