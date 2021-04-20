import {
  NATURE_STAT_BOOST,
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

}

// deno-lint-ignore ban-types
export type StatusEffect = {}

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
  type2: Type;
  //normalAbility1: Ability
  //normalAbility2: Ability
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
  baseHP: number;
  baseAttack: number;
  baseDefense: number;
  baseSpecialAttack: number;
  baseSpecialDefense: number;
  baseSpeed: number;
  HPEVYield: number;
  attackEVYield: number;
  defenseEVYield: number;
  specialAttackEVYield: number;
  specialDefenseEVYield: number;
  speedEVYield: number;
  //learnset: Learnset;

  // Calculation overrides
  setName?: (self: Typemon, newName: string) => string;
  getName?: (self: Typemon, storedName: string) => string;
  setSex?: (self: Typemon, newSex: Sex) => Sex;
  getSex?: (self: Typemon, storedSex: Sex) => Sex;
  getMaxHP?: (
    self: Typemon,
    normalValue: number,
    considerBattleStatus: boolean
  ) => number;
  getAttack?: (
    self: Typemon,
    normalValue: number,
    considerBattleStatus: boolean
  ) => number;
  getSpecialAttack?: (
    self: Typemon,
    normalValue: number,
    considerBattleStatus: boolean
  ) => number;
  getDefense?: (
    self: Typemon,
    normalValue: number,
    considerBattleStatus: boolean
  ) => number;
  getSpecialDefense?: (
    self: Typemon,
    normalValue: number,
    considerBattleStatus: boolean
  ) => number;
  getSpeed?: (
    self: Typemon,
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
  hpIV?: number;
  hpEV?: number;
  attackIV?: number;
  attackEV?: number;
  specialAttackIV?: number;
  specialAttackEV?: number;
  defenseIV?: number;
  defenseEV?: number;
  specialDefenseIV?: number;
  specialDefenseEV?: number;
  speedIV?: number;
  speedEV?: number;
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
    this.hpIV = options.hpIV || Math.floor(Math.random() * MAX_TYPEMON_IV);
    this.hpEV = options.hpEV || 0;
    this.hp = this.maxHp(false);
    this.attackIV = options.attackIV || Math.floor(Math.random() * MAX_TYPEMON_IV);
    this.attackEV = options.attackEV || 0;
    this.specialAttackIV =
      options?.specialAttackIV || Math.floor(Math.random() * MAX_TYPEMON_IV);
    this.specialAttackEV = options.specialAttackEV || 0;
    this.defenseIV = options.defenseIV || Math.floor(Math.random() * MAX_TYPEMON_IV);
    this.defenseEV = options.defenseEV || 0;
    this.specialDefenseIV =
      options.specialDefenseIV || Math.floor(Math.random() * MAX_TYPEMON_IV);
    this.specialDefenseEV = options.specialDefenseEV || 0;
    this.speedIV = options.speedIV || Math.floor(Math.random() * MAX_TYPEMON_IV);
    this.speedEV = options.speedEV || 0;
  }

  // Name
  protected _name = "Initialization error";
  public get name() {
    return this.species.getName?.(this, this._name) || this._name;
  }
  public set name(name: string) {
    name = name || this.species.name;
    this._name = this.species.setName?.(this, name) || name;
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

  // Stats
  private originalNature: Nature;
  private temporaryNature: Nature;
  public nature(considerBattleStatus: boolean): number {
    return considerBattleStatus ? this.temporaryNature : this.originalNature;
  }

  static statStageMultiplier(stage: number, effect: number): number {
    return stage > 0 ? (stage + effect) / effect : effect / (stage + effect);
  }

  public hpIV: number;
  public hpEV: number;
  public hp: number;
  public maxHp(considerBattleStatus: boolean) {
    // I have no idea WTF the formatter is doing here
    const val =
      Math.floor(
        ((2 * this.species.baseHP + this.hpIV + Math.floor(this.hpEV / 4)) *
          this.level) /
          100
      ) +
      this.level +
      10;
    return this.species.getMaxHP?.(this, val, considerBattleStatus) || val;
  }

  public attackIV: number;
  public attackEV: number;
  private _attackStage = 0;
  public get attackStage() {
    return this._attackStage;
  }
  public modifyAttackStage(modification: number): number {
    const prev = this._attackStage;
    this._attackStage += modification;
    if (this._attackStage > MAX_TYPEMON_STAT_STAGE) this._attackStage = MAX_TYPEMON_STAT_STAGE;
    if (this._attackStage < MIN_TYPEMON_STAT_STAGE) this._attackStage = MIN_TYPEMON_STAT_STAGE;
    return this._attackStage - prev;
  }
  public resetAttackStage(): number {
    const prev = this.attackStage;
    this._attackStage = 0;
    return -prev;
  }
  public attack(considerBattleStatus: boolean) {
    // I have no idea WTF the formatter is doing here
    let val =
      Math.floor(
        ((2 * this.species.baseAttack +
          this.attackIV +
          Math.floor(this.attackEV / 4)) *
          this.level) /
          100
      ) + 5;
    if (Math.floor(this.nature(considerBattleStatus) / 5) === 0)
      val *= 1 + NATURE_STAT_BOOST;
    if (this.nature(considerBattleStatus) % 5 === 0)
      val *= 1 - NATURE_STAT_BOOST;
    val =
      Math.floor(val) *
      (considerBattleStatus
        ? Typemon.statStageMultiplier(this.attackStage, 2)
        : 1);
    return this.species.getAttack?.(this, val, considerBattleStatus) || val;
  }

  public specialAttackIV: number;
  public specialAttackEV: number;
  private _specialAttackStage = 0;
  public get specialAttackStage() {
    return this._specialAttackStage;
  }
  public modifySpecialAttackStage(modification: number): number {
    const prev = this._specialAttackStage;
    this._specialAttackStage += modification;
    if (this._specialAttackStage > MAX_TYPEMON_STAT_STAGE)
      this._specialAttackStage = MAX_TYPEMON_STAT_STAGE;
    if (this._specialAttackStage < MIN_TYPEMON_STAT_STAGE)
      this._specialAttackStage = MIN_TYPEMON_STAT_STAGE;
    return this._specialAttackStage - prev;
  }
  public resetSpecialAttackStage(): number {
    const prev = this.specialAttackStage;
    this._specialAttackStage = 0;
    return -prev;
  }
  public specialAttack(considerBattleStatus: boolean) {
    // I have no idea WTF the formatter is doing here
    let val =
      Math.floor(
        ((2 * this.species.baseSpecialAttack +
          this.specialAttackIV +
          Math.floor(this.specialAttackEV / 4)) *
          this.level) /
          100
      ) + 5;
    if (Math.floor(this.nature(considerBattleStatus) / 5) === 3)
      val *= 1 + NATURE_STAT_BOOST;
    if (this.nature(considerBattleStatus) % 5 === 3)
      val *= 1 - NATURE_STAT_BOOST;
    val =
      Math.floor(val) *
      (considerBattleStatus
        ? Typemon.statStageMultiplier(this.specialAttackStage, 2)
        : 1);
    return (
      this.species.getSpecialAttack?.(this, val, considerBattleStatus) || val
    );
  }

  public defenseIV: number;
  public defenseEV: number;
  private _defenseStage = 0;
  public get defenseStage() {
    return this._defenseStage;
  }
  public modifyDefenseStage(modification: number): number {
    const prev = this._defenseStage;
    this._defenseStage += modification;
    if (this._defenseStage > MAX_TYPEMON_STAT_STAGE)
      this._defenseStage = MAX_TYPEMON_STAT_STAGE;
    if (this._defenseStage < MIN_TYPEMON_STAT_STAGE)
      this._defenseStage = MIN_TYPEMON_STAT_STAGE;
    return this._defenseStage - prev;
  }
  public resetDefenseStage(): number {
    const prev = this.defenseStage;
    this._defenseStage = 0;
    return -prev;
  }
  public defense(considerBattleStatus: boolean) {
    // I have no idea WTF the formatter is doing here
    let val =
      Math.floor(
        ((2 * this.species.baseDefense +
          this.defenseIV +
          Math.floor(this.defenseEV / 4)) *
          this.level) /
          100
      ) + 5;
    if (Math.floor(this.nature(considerBattleStatus) / 5) === 1)
      val *= 1 + NATURE_STAT_BOOST;
    if (this.nature(considerBattleStatus) % 5 === 1)
      val *= 1 - NATURE_STAT_BOOST;
    val =
      Math.floor(val) *
      (considerBattleStatus
        ? Typemon.statStageMultiplier(this.defenseStage, 2)
        : 1);
    return this.species.getDefense?.(this, val, considerBattleStatus) || val;
  }

  public specialDefenseIV: number;
  public specialDefenseEV: number;
  private _specialDefenseStage = 0;
  public get specialDefenseStage() {
    return this._specialDefenseStage;
  }
  public modifySpecialDefenseStage(modification: number): number {
    const prev = this._specialDefenseStage;
    this._specialDefenseStage += modification;
    if (this._specialDefenseStage > MAX_TYPEMON_STAT_STAGE)
      this._specialDefenseStage = MAX_TYPEMON_STAT_STAGE;
    if (this._specialDefenseStage < MIN_TYPEMON_STAT_STAGE)
      this._specialDefenseStage = MIN_TYPEMON_STAT_STAGE;
    return this._specialDefenseStage - prev;
  }
  public resetSpecialDefenseStage(): number {
    const prev = this.specialDefenseStage;
    this._specialDefenseStage = 0;
    return -prev;
  }
  public specialDefense(considerBattleStatus: boolean) {
    // I have no idea WTF the formatter is doing here
    let val =
      Math.floor(
        ((2 * this.species.baseSpecialDefense +
          this.specialDefenseIV +
          Math.floor(this.specialDefenseEV / 4)) *
          this.level) /
          100
      ) + 5;
    if (Math.floor(this.nature(considerBattleStatus) / 5) === 4)
      val *= 1 + NATURE_STAT_BOOST;
    if (this.nature(considerBattleStatus) % 5 === 4)
      val *= 1 - NATURE_STAT_BOOST;
    val =
      Math.floor(val) *
      (considerBattleStatus
        ? Typemon.statStageMultiplier(this.specialDefenseStage, 2)
        : 1);
    return (
      this.species.getSpecialDefense?.(this, val, considerBattleStatus) || val
    );
  }

  public speedIV: number;
  public speedEV: number;
  private _speedStage = 0;
  public get speedStage() {
    return this._speedStage;
  }
  public modifySpeedStage(modification: number): number {
    const prev = this._speedStage;
    this._speedStage += modification;
    if (this._speedStage > MAX_TYPEMON_STAT_STAGE) this._speedStage = MAX_TYPEMON_STAT_STAGE;
    if (this._speedStage < MIN_TYPEMON_STAT_STAGE) this._speedStage = MIN_TYPEMON_STAT_STAGE;
    return this._speedStage - prev;
  }
  public resetSpeedStage(): number {
    const prev = this.speedStage;
    this._speedStage = 0;
    return -prev;
  }
  public speed(considerBattleStatus: boolean) {
    let val =
      Math.floor(
        ((2 * this.species.baseSpeed +
          this.speedIV +
          Math.floor(this.speedEV / 4)) *
          this.level) /
          100
      ) + 5;
    if (Math.floor(this.nature(considerBattleStatus) / 5) === 2)
      val *= 1 + NATURE_STAT_BOOST;
    if (this.nature(considerBattleStatus) % 5 === 2)
      val *= 1 - NATURE_STAT_BOOST;
    val =
      Math.floor(val) *
      (considerBattleStatus
        ? Typemon.statStageMultiplier(this.speedStage, 2)
        : 1);
    return this.species.getSpeed?.(this, val, considerBattleStatus) || val;
  }

  public toString(): string {
    return `Level ${this.level} ${Nature[this.nature(false)]}${
      this.sex === SexNone ? "" : " " + this.sex.name
    } ${this.species.name}${
      this.name === this.species.name ? "" : " named " + this.name
    }\nHP: ${this.hp}/${this.maxHp(false)} (${this.hpIV},${
      this.hpEV
    }); Attack: ${this.attack(false)} (${this.attackIV}, ${
      this.attackEV
    }); Defense: ${this.defense(false)} (${this.defenseIV}, ${
      this.defenseEV
    })\nSpecial Attack: ${this.specialAttack(false)} (${
      this.specialAttackIV
    }, ${this.specialAttackEV}); Special Defense: ${this.specialDefense(
      false
    )} (${this.specialDefenseIV}, ${
      this.specialDefenseEV
    }); Speed: ${this.speed(false)} (${this.speedIV}, ${this.speedEV})`;
  }
}
