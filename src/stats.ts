// Add new stats by editing these two arrays
// Type errors will show you where else you need to edit
// Everything else will adapt automatically
export const PermanentStats = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"] as const;
export const BattleStats = ["accuracy", "evasion"] as const;

import { ICodemon } from "./codemon.ts";
import { decide } from "./decision.ts";
import { EventEmitter } from "./external.ts";
import { getRandomNatureDecider } from "./injections.ts";
import { Codemon, config } from "./mod.ts";

export const Stats = [...PermanentStats, ...BattleStats] as const;
export type PermanentStat = typeof PermanentStats[number];
export type BattleStat = typeof BattleStats[number];
export type Stat = typeof Stats[number];

export type BaseStats = Record<PermanentStat, number>;
export type EVYields = Partial<Record<PermanentStat, number>>;
export type StageMods = Partial<Record<Stat, number>>;

class StatStage {
  private _stage;

  public constructor(public readonly entry: BattleStatEntry, public power: number, stage?: number) {
    this._stage = 0;
    if (stage) this.modify(stage);
  }

  public get current() {
    return this._stage;
  }

  public modify(modification: number) {
    const old = this.current;
    this._stage += modification;
    this._stage = Math.max(config.stats.minStage, Math.min(this._stage, config.stats.maxStage));
    if (this._stage !== old) this.entry.set.emit("stageChange", this.entry.stat, old, this.current);
    return this._stage - old;
  }

  public reset() {
    const old = this.current;
    this._stage = 0;
    if (this._stage !== old) this.entry.set.emit("stageReset", this.entry.stat, old);
  }

  // TODO this is broken
  public multiplier(): number {
    return this.current > 0 ? (this.power + this.current) / this.power : this.power / (this.power - this.current);
  }
}
interface IBattleStatEntry {
  stage?: number;
}

class BattleStatEntry {
  public stage: StatStage;

  constructor(public readonly stat: Stat, public readonly set: StatSet, stagePower: number, args: IBattleStatEntry) {
    this.stage = new StatStage(this, stagePower, args?.stage);
  }

  public toString() {
    return `${this.stat}: ${this.stage.current}`;
  }
}

interface IPermanentStatEntry extends IBattleStatEntry {
  individualValue?: number;
  effortValue?: number;
}
class PermanentStatEntry extends BattleStatEntry {
  public individualValue: number;
  public effortValue: number;
  constructor(stat: Stat, set: StatSet, stagePower: number, args: IPermanentStatEntry) {
    super(stat, set, stagePower, args);
    if (!PermanentStats.includes(stat as PermanentStat)) throw new Error(`Invalid stat ${stat} for PermanentStatEntry`);
    this.individualValue = args.individualValue ?? Math.floor(Math.random() * config.stats.maxIV);
    this.effortValue = args.effortValue ?? 0;
  }

  public value(considerStage = false) {
    let val =
      2 * this.set.self.species.baseStats[this.stat as PermanentStat] +
      this.individualValue +
      Math.floor(this.effortValue / 4);
    val = Math.floor((val * this.set.level) / 100) + 5;

    const nature = considerStage ? this.set.self.nature : this.set.self.originalNature;
    const natureBuff = nature.buff === this.stat;
    const natureNerf = nature.nerf === this.stat;
    let natureEffect = 1;
    if (natureBuff && !natureNerf) natureEffect *= 1 + config.stats.natureEffect;
    if (natureNerf && !natureBuff) natureEffect *= 1 - config.stats.natureEffect;
    if (nature.effect) natureEffect = nature.effect(this.stat);
    val = Math.floor(val * natureEffect);

    if (considerStage) val = Math.floor(val * this.stage.multiplier());

    return val;
  }

  public toString() {
    return `${this.stat}: ${this.value(true)} ${this.stage.current ? `(${this.value(false)}) ` : ""}(${
      this.individualValue
    }|${this.effortValue}|${this.stage.current})`;
  }
}

// disregards but doesn't disallow stage
class HPStatEntry extends PermanentStatEntry {
  public current;
  public get max() {
    return this.value();
  }
  constructor(set: StatSet, args: IPermanentStatEntry) {
    super("hp", set, 0, args);
    this.current = this.value();
  }

  public value() {
    const original = super.value(false);
    return original + this.set.level + 5;
  }

  public get percent() {
    return this.current / this.max;
  }

  public heal(amount: number) {
    const change = Math.min(amount, this.max - this.current);
    this.current += change;
    return change;
  }

  public damage(amount: number) {
    const change = Math.min(amount, this.current);
    this.current -= change;
    return change;
  }

  public toString() {
    return `${this.stat}: ${this.current}/${this.value()} (${this.effortValue}|${this.individualValue})`;
  }
}

export type ExperienceGroup = (level: number) => number;

export interface LevelUpReciept {
  oldLevel: number;
  newLevel: number;
  forcedPoints?: number;
  statChange?: Record<PermanentStat, number>;
}

export interface AddExpReciept {
  levelUps: Array<LevelUpReciept>;
}

type StatEntries = Record<PermanentStat, PermanentStatEntry> & Record<BattleStat, BattleStatEntry>;
type IStatEntries = Partial<Record<PermanentStat, IPermanentStatEntry>> & Partial<Record<BattleStat, IBattleStatEntry>>;

export type IStatSet = IStatEntries & { level?: number; points?: number };

export class StatSet
  // todo: this should be on Codemon, not StatSet
  extends EventEmitter<{
    stageChange: [stat: Stat, old: number, current: number];
    stageReset: [stat: Stat, old: number];
    levelUp: [reciept: LevelUpReciept];
    addExp: [reciept: AddExpReciept];
  }>
  implements StatEntries
{
  public hp: HPStatEntry;
  public attack: PermanentStatEntry;
  public defense: PermanentStatEntry;
  public specialAttack: PermanentStatEntry;
  public specialDefense: PermanentStatEntry;
  public speed: PermanentStatEntry;

  public accuracy: BattleStatEntry;
  public evasion: BattleStatEntry;

  public level: number;
  public points: number;

  constructor(public readonly self: Codemon, args: IStatSet) {
    super();
    this.level = args.level ?? 1;
    this.points = this.self.species.experienceGroup(this.level);
    if (args.points) this.addExp(args.points);

    this.hp = new HPStatEntry(this, args.hp ?? {});
    this.attack = new PermanentStatEntry("attack", this, 2, args.attack ?? {});
    this.defense = new PermanentStatEntry("defense", this, 2, args.defense ?? {});
    this.specialAttack = new PermanentStatEntry("specialAttack", this, 2, args.specialAttack ?? {});
    this.specialDefense = new PermanentStatEntry("specialDefense", this, 2, args.specialDefense ?? {});
    this.speed = new PermanentStatEntry("speed", this, 2, args.speed ?? {});

    this.accuracy = new BattleStatEntry("accuracy", this, 3, args.accuracy ?? {});
    this.evasion = new BattleStatEntry("evasion", this, 3, args.evasion ?? {});
  }

  public async levelUp(): Promise<LevelUpReciept>;
  public async levelUp(levels: number): Promise<LevelUpReciept[]>;
  public async levelUp(levels?: number): Promise<LevelUpReciept | LevelUpReciept[]> {
    if (levels) {
      const ret: LevelUpReciept[] = [];
      for (let i = 0; i < levels; i++) ret.push(await this.levelUp());
      return ret;
    }

    const old = this.level;
    this.level += 1;
    const ret: LevelUpReciept = {
      oldLevel: old,
      newLevel: this.level,
    };
    if (this.points < this.self.species.experienceGroup(this.level)) {
      const forcedPoints = this.self.species.experienceGroup(this.level) - this.points;
      if (forcedPoints > 0) ret.forcedPoints = forcedPoints;
      this.points = this.self.species.experienceGroup(this.level);
    }
    await this.wait("levelUp", ret);
    return ret;
  }

  public async addExp(exp: number): Promise<AddExpReciept> {
    this.points += exp;
    const levelUps: LevelUpReciept[] = [];
    while (this.self.species.experienceGroup(this.level) < this.points) {
      levelUps.push(await this.levelUp());
    }
    this.wait("addExp", { levelUps });
    return { levelUps };
  }

  public get pointsToNextLevel() {
    return this.self.species.experienceGroup(this.level + 1) - this.points;
  }

  public get percentToNextLevel() {
    return (
      this.points / (this.self.species.experienceGroup(this.level + 1) - this.self.species.experienceGroup(this.level))
    );
  }

  public toString() {
    const level = `Level: ${this.level} (${
      this.points - this.self.species.experienceGroup(this.level)
    }/${this.self.species.experienceGroup(this.level + 1)}))`;
    const permanants = PermanentStats.map(s => this[s].toString()).join("\n");
    const battles = BattleStats.map(s => this[s].toString()).join(", ");
    return [level, permanants, battles].join("\n");
  }
}

export interface Nature {
  name: string;
  buff: Exclude<PermanentStat, "hp">;
  nerf: Exclude<PermanentStat, "hp">;
  effect?: (stat: Stat) => number;
}

export function getRandomNature(iCodemon: ICodemon): Nature {
  return decide(getRandomNatureDecider(), iCodemon);
}
