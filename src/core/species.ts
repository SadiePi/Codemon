import { Stat } from "./stats.ts";
import Codemon from "./codemon.ts";
import { ExperienceGroup, Learnset } from "./experience.ts";
import { Type } from "./type.ts";
import { Sex } from "./sex.ts";
import { BaseStats, EVYields } from "./stats.ts";
import { Nature } from "./nature.ts";
import { Battle } from "./battle.ts";

export interface Species<B extends Battle = Battle> {
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
  learnset: Learnset<B>;

  // Calculation overrides
  overrideName?: (self: Codemon<B>, inputName: string) => string;
  overrideSex?: (self: Codemon<B>, inputSex: Sex) => Sex;
  overrideStatValue?: (self: Codemon<B>, stat: Stat, inputStat: number, considerBattleStatus: boolean) => number; // TODO use this
  overrideNature?: (self: Codemon<B>, inputNature: Nature) => Nature;
}
