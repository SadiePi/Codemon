import {
  NATURE_STAT_EFFECT,
  MAX_TYPEMON_STAT_STAGE,
  MIN_TYPEMON_STAT_STAGE,
  DEFAULT_TYPEMON_LEVEL,
  MAX_TYPEMON_IV,
} from "./constants.ts";

export type Type = {
  weaknesses: Type[];
  resistances: Type[];
  immunities: Type[];
};

export const TypeNone: Type = {
  weaknesses: [],
  resistances: [],
  immunities: [],
};

// WIP
// deno-lint-ignore ban-types
export type Ability = {
  //onMoveSelection?:(...)=>void
  //beforeMoveExecution?:(move: Move, target: Typemon, battle: Battle)=>void;
  //afterMoveExecution?:(...)=>void;
  //beforeItemUse?:(...)=>void
  //afterItemUse?:(...)=>void
  //beforeTypemonSwap?:(...)=>void
  //afterTypemonSwap?:(...)=>void
  //beforeFleeAttempt?: (...)=>void
  //afterFleeAttempt?: (...)=>void
  //beforeWeatherEffect?: (...)=>void
  //afterWeatherEffect?: (...)=>void
  //abilityNullifications?: Ability[]
};

// deno-lint-ignore ban-types
export type StatusEffect = {};

export type Sex = {
  //symbol: Image;
  name: string;
};
export const SexMale = {
  name: "Male",
};
export const SexFemale = {
  name: "Female",
};
export const SexNone = {
  name: "None",
};

export type ExperienceGroup = (level: number) => number;
export const expGroupSlow = (l: number) => (5 * Math.pow(l, 3)) / 4;
export const expGroupMedSlow = (l: number) =>
  (6 * Math.pow(l, 3)) / 5 - 15 * Math.pow(l, 2) + 100 * l - 140;
export const expGroupMedFast = (l: number) => Math.pow(l, 3);
export const expGroupFast = (l: number) => (4 * Math.pow(l, 3)) / 5;
export const expGroupErratic = function (l: number) {
  if (l <= 50) return (Math.pow(l, 3) * (100 - l)) / 50;
  else if (l <= 68) return (Math.pow(l, 3) * (150 - l)) / 100;
  else if (l <= 98) return (Math.pow(l, 3) * ((1911 - 10 * l) / 3)) / 500;
  else if (l <= 100) return (Math.pow(l, 3) * (160 - l)) / 100;
  return Number.POSITIVE_INFINITY;
};
export const expGroupFluctuating = function (l: number) {
  if (l <= 15) return (Math.pow(l, 3) * ((l + 1) / 3 + 24)) / 50;
  if (l <= 36) return (Math.pow(l, 3) * (l + 14)) / 50;
  if (l <= 100) return (Math.pow(l, 3) * (l / 2 + 32)) / 50;
  return Number.POSITIVE_INFINITY;
};

export enum Nature {
  "Hardy",
  "Lonely",
  "Brave",
  "Adamant",
  "Naughty",
  "Bold",
  "Docile",
  "Relaxed",
  "Impish",
  "Lax",
  "Timid",
  "Hasty",
  "Serious",
  "Jolly",
  "Naive",
  "Modest",
  "Mild",
  "Quiet",
  "Bashful",
  "Rash",
  "Calm",
  "Gentle",
  "Sassy",
  "Careful",
  "Quirky",
}

export enum Stat {
  MaxHP = 0,
  Attack = 1,
  Defense = 2,
  Speed = 3,
  SpecialAttack = 4,
  SpecialDefense = 5,
  Accuracy = 6,
  Evasion = 7
}

// deno-lint-ignore ban-types
export type LevelUpReport = {
  // TODO
};

export type AddExpReport = {
  levelUps: Array<LevelUpReport>;
};

export type Species = {
  // Normal species definition information
  name: string;
  //graphics: Graphics
  type1: Type;
  type2?: Type;
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
  //typedexColor: TypedexColor
  baseFriendship: number;
  baseStats: [number|undefined, number|undefined, number|undefined, number|undefined, number|undefined, number|undefined];
  evYields: [number|undefined, number|undefined, number|undefined, number|undefined, number|undefined, number|undefined];
  //learnset: Learnset;

  // Calculation overrides
  setName?: (self: Typemon, newName: string) => string;
  getName?: (self: Typemon, storedName: string) => string;
  setSex?: (self: Typemon, newSex: Sex) => Sex;
  getSex?: (self: Typemon, storedSex: Sex) => Sex;
  getStat?: (
    self: Typemon,
    stat: Stat,
    normalValue: number,
    considerBattleStatus: boolean
  ) => number;
};

export type TypemonOptions = {
  species: Species;
  name?: string;
  sex?: Sex;
  level?: number;
  nature?: Nature;
  ivs?: [number|undefined, number|undefined, number|undefined, number|undefined, number|undefined, number|undefined];
  evs?: [number|undefined, number|undefined, number|undefined, number|undefined, number|undefined, number|undefined];
  //move1?: Move;
  //move2?: Move;
  //move3?: Move;
  //move4?: Move;
};

export class Typemon {
  public species: Species;

  constructor(options: TypemonOptions) {
    // TODO enfore sane values
    this.species = options.species;
    this.name = options.name || this.species.name;
    this.sex =
      options.sex || Math.random() < this.species.sexRatio
        ? SexMale
        : SexFemale;
    this._level = 0;
    this.levelUp(options.level || DEFAULT_TYPEMON_LEVEL);
    this._exp = this.species.experienceGroup(this._level);
    this._expToNextLevel = this.species.experienceGroup(this._level + 1);
    this.originalNature = this.temporaryNature =
      options.nature || (Math.floor(Math.random() * 25) as Nature);

    this._ivs = [0, 0, 0, 0, 0, 0];
    this._evs = [0, 0, 0, 0, 0, 0];
    this._statStages = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 6; i++) {
      this._ivs[i] = options.ivs?.[i] ?? Math.random() * MAX_TYPEMON_IV;
      this._evs[i] = options.evs?.[i] ?? 0;
    }

    this.hp = this.stat(Stat.MaxHP, false);
  }

  // Name
  protected _name = "Initialization error";
  public get name() {
    return this.species.getName?.(this, this._name) ?? this._name;
  }
  public set name(name: string) {
    name = name || this.species.name;
    this._name = this.species.setName?.(this, name) ?? name;
  }

  // Sex
  protected _sex: Sex = { name: "Initialization error" };
  public get sex() {
    return this.species.getSex?.(this, this._sex) || this._sex;
  }
  public set sex(sex: Sex) {
    this._sex = this.species.setSex?.(this, sex) || sex;
  }

  // Level & Exp
  private _level: number;
  public get level() {
    return this._level;
  }
  private _exp: number;
  private _expToNextLevel: number;
  public get exp(): number {
    return this._exp;
  }
  public levelUp(levels = 1): Array<LevelUpReport> {
    for (let i = 0; i < levels; i++) {
      this._level++;
      // Add to report
    }
    this._exp = this.species.experienceGroup(this._level);
    this._expToNextLevel = this.species.experienceGroup(this._level + 1);
    return [];
  }
  public addExp(exp: number): Array<LevelUpReport> {
    while (exp > this._expToNextLevel - this._exp) {
      this._level += 1;
      // Add to report
      exp -= this._expToNextLevel - this._exp;
      this._exp = this._expToNextLevel;
      this._expToNextLevel = this.species.experienceGroup(this._level + 1);
    }
    this._exp += exp;
    return [];
  }

  // Stats & Nature
  private originalNature: Nature;
  private temporaryNature: Nature;
  public nature(considerBattleStatus: boolean): number {
    return considerBattleStatus ? this.temporaryNature : this.originalNature;
  }

  static StatStageMultiplier(stage: number, effect: number): number {
    return stage > 0 ? (stage + effect) / effect : effect / (stage + effect);
  }

  private _ivs: number[];
  private _evs: number[];
  private _statStages: number[];
  public hp: number;

  public stat(stat: Stat, considerStatStages: boolean) {
    const statIndex = stat as number; // This is just to prevent `this.species.baseStats[stat]` from throwing a stupid error
    if (statIndex >= 6)
      throw RangeError(`Given Stat ${stat} does not have a computable value`);
    
    let val =
      2 * (this.species.baseStats[statIndex] ?? -1) +
      this._ivs[statIndex] +
      Math.floor(this._evs[statIndex] / 4);
    val = Math.floor(val * this.level / 100);
    val += stat == Stat.MaxHP ? this.level + 10 : 5;

    const natureBuff =
      Math.floor(this.nature(considerStatStages) / 5) === statIndex - 1;
    const natureNerf = this.nature(considerStatStages) % 5 === statIndex - 1;
    if (natureBuff && !natureNerf) val *= 1 + NATURE_STAT_EFFECT;
    if (natureNerf && !natureBuff) val *= 1 - NATURE_STAT_EFFECT;
    val = Math.floor(val);

    if (considerStatStages) {
      val *= Typemon.StatStageMultiplier(this._statStages[statIndex], 2);
      val = Math.floor(val);
    }
    return this.species.getStat?.(this, stat, val, considerStatStages) || val;
  }

  public stats(considerStatStages: boolean): [number, number, number, number, number, number] {
    return [
      this.stat(Stat.MaxHP, considerStatStages),
      this.stat(Stat.Attack, considerStatStages),
      this.stat(Stat.Defense, considerStatStages),
      this.stat(Stat.Speed, considerStatStages),
      this.stat(Stat.SpecialAttack, considerStatStages),
      this.stat(Stat.SpecialDefense, considerStatStages),
    ]
  }

  public stage(stat: Stat) {
    if (stat === Stat.MaxHP)
      throw RangeError(`Given Stat ${stat} does not have a stage`);
    return this._statStages[stat - 1];
  }

  public modifyStage(stat: Stat, modification: number) {
    if (stat === Stat.MaxHP)
      throw RangeError(`Given Stat ${stat} does not have a stage`);
    this._statStages[stat] += modification;
    this._statStages[stat] = Math.max(
      MIN_TYPEMON_STAT_STAGE,
      Math.min(this._statStages[stat], MAX_TYPEMON_STAT_STAGE)
    );
  }

  public resetStage(stat: Stat) {
    if (stat === Stat.MaxHP)
      throw RangeError(`Given Stat ${stat} does not have a stage`);
    this._statStages[stat] = 0;
  }

  public IV(stat: Stat) {
    if (stat >= 6) throw RangeError(`Given Stat ${stat} does not have an IV`);
    return this._ivs[stat];
  }

  public setIV(stat: Stat, iv: number) {
    if (stat >= 6) throw RangeError(`Given Stat ${stat} does not have an IV`);
    this._ivs[stat] = iv;
  }

  public EV(stat: Stat) {
    if (stat >= 6) throw RangeError(`Given Stat ${stat} does not have an EV`);
    return this._evs[stat];
  }

  public setEV(stat: Stat, ev: number) {
    if (stat >= 6) throw RangeError(`Given Stat ${stat} does not have an EV`);
    this._evs[stat] = ev;
  }

  public toString(): string {
    return `Level ${this.level} ${Nature[this.nature(false)]}${
      this.sex === SexNone ? "" : " " + this.sex.name
    } ${this.species.name}${
      this.name === this.species.name ? "" : " named " + this.name
    }\nHP: ${this.hp}/${this.stat(Stat.MaxHP, false)} (${this.IV(
      Stat.MaxHP
    )},${this.EV(Stat.MaxHP)}); Attack: ${this.stat(
      Stat.Attack,
      false
    )} (${this.IV(Stat.Attack)}, ${this.EV(Stat.Attack)}); Defense: ${this.stat(
      Stat.Defense,
      false
    )} (${this.IV(Stat.Defense)}, ${this.EV(
      Stat.Defense
    )})\nSpecial Attack: ${this.stat(Stat.SpecialAttack, false)} (${
      this.IV(Stat.SpecialAttack)
    }, ${this.EV(Stat.SpecialAttack)}); Special Defense: ${this.stat(Stat.SpecialDefense,
      false
    )} (${this.IV(Stat.SpecialDefense)}, ${
      this.EV(Stat.SpecialDefense)
    }); Speed: ${this.stat(Stat.Speed,false)} (${this.IV(Stat.Speed)}, ${this.EV(Stat.Speed)})`;
  }
}
