/**
 * The basic stats of a Codemon.
 *
 * Add new stats by changing this array and `BattleStats`.
 * Type errors will show you where else you need to edit.
 * Adding a permanent stat will require defining a base value for each species in your Codex.
 * Everything else will adapt automatically.
 */
export const PermanentStats = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"] as const;
/** Temporary stats that modify the battle
 *
 * Add new stats by changing this array and `PermanentStats`.
 * Type errors will show you where else you need to edit.
 * Everything else will adapt automatically.
 */
export const BattleStats = ["accuracy", "evasion"] as const;

import { ICodemon, Codemon } from "./codemon.ts";
import { decide } from "./decision.ts";
import { EventEmitter } from "./external.ts";
import { config } from "./config.ts";
import { sequentialAsync } from "./util.ts";

/** All possible stats in the game */
export const Stats = [...PermanentStats, ...BattleStats] as const;
/** All possible stats in the game */
export type Stat = (typeof Stats)[number];
/** The basic stats of a Codemon */
export type PermanentStat = (typeof PermanentStats)[number];
/** Temporary stats that modify the battle */
export type BattleStat = (typeof BattleStats)[number];

/** The Base Stats of a Codemon */
export type BaseStats = Record<PermanentStat, number>;
/** The EV Yield of a defeated Codemon */
export type EVYields = Partial<Record<PermanentStat, number>>;
/** Satge Modifications to a Stat in battle */
export type StageMods = Partial<Record<Stat, number>>;

/** The Stage of a Stat */
class StatStage {
  private _stage;

  public constructor(
    /** The StatEntry this  */
    public readonly entry: StatEntry,
    public power: number,
    stage?: number
  ) {
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
    if (this._stage !== old) {
      this.entry.set.emit("stageChange", this.entry.stat, old, 0);
      this.entry.set.emit("stageReset", this.entry.stat, old);
    }
  }

  public get multiplier(): number {
    return this.current > 0 ? (this.power + this.current) / this.power : this.power / (this.power - this.current);
  }

  public get isMax() {
    return this.current === config.stats.maxStage;
  }

  public get isMin() {
    return this.current === config.stats.minStage;
  }
}
/** The parameters for a BattleStatEntry */
interface IBattleStatEntry {
  stage?: number;
}

/** A BattleStat in use */
class BattleStatEntry {
  /** The stage of this entry */
  public stage: StatStage;

  constructor(
    /** Which stat this entry represents */
    public readonly stat: Stat,
    /** The StatSet this entry belongs to */
    public readonly set: StatSet,
    /** How effective stages are. Lower is stronger, min is 0+ε (small positive float) */
    stagePower: number,
    /** The parameters given from ICodemon */
    args: IBattleStatEntry
  ) {
    this.stage = new StatStage(this, stagePower, args?.stage);
  }

  public toString() {
    return `${this.stat}: ${this.stage.current}`;
  }
}

// TODO NEXT use this
// Must be EXACT inverse functions when considerStage is false
interface PermanentStatSolver {
  eviv2value: (eviv: IPermanentStatEntry, considerStage?: boolean) => number;
  value2eviv: (value: number, enforce?: { ev: number } | { iv: number }) => IPermanentStatEntry;
}

/** The parameters for a PermanentStatEntry */
interface IPermanentStatEntry extends IBattleStatEntry {
  individualValue?: number;
  effortValue?: number;
}
/** A PermanentStat in use */
class PermanentStatEntry extends BattleStatEntry {
  /** The individual value (IV) of this stat */
  public individualValue: number;
  /** The effort value (EV) of this stat */
  public effortValue: number;
  constructor(stat: Stat, set: StatSet, stagePower: number, args: IPermanentStatEntry) {
    super(stat, set, stagePower, args);
    if (!PermanentStats.includes(stat as PermanentStat))
      throw new Error(`PermanentStatEntry: ${stat} is not a PermanentStat. Owner is ${set.self.name}`);
    this.individualValue = args.individualValue ?? Math.floor(Math.random() * config.stats.maxIV);
    this.effortValue = args.effortValue ?? 0;
  }

  /** The value of this stat. Ignores stage by default, pass true to enable */
  public value(considerStage = false) {
    let val =
      2 * this.set.self.getSpecies().baseStats[this.stat as PermanentStat] +
      this.individualValue +
      Math.floor(this.effortValue / 4);
    val = Math.floor((val * this.set.level) / 100) + 5;

    // Apply nature effect, if any
    const nature = considerStage ? this.set.self.nature : this.set.self.originalNature;
    const natureBuff = nature.buff === this.stat;
    const natureNerf = nature.nerf === this.stat;
    let natureEffect = 1;
    if (natureBuff && !natureNerf) natureEffect *= 1 + config.stats.natureBuff;
    if (natureNerf && !natureBuff) natureEffect *= 1 - config.stats.natureNerf;
    if (nature.effect) natureEffect = nature.effect(this.stat);
    val = Math.floor(val * natureEffect);

    // Apply stage if requested
    if (considerStage) val = Math.floor(val * this.stage.multiplier);

    return val;
  }

  public toString() {
    return `${this.stat}: ${this.value(true)} ${this.stage.current ? `(${this.value(false)}) ` : ""}(${
      this.individualValue
    }|${this.effortValue}|${this.stage.current})`;
  }
}

/**
 *
 */
interface IHPStatEntry extends IPermanentStatEntry {
  current?: number;
}
/** A custom PermanentStatEntry for HP */
class HPStatEntry extends PermanentStatEntry {
  public current;
  public get max() {
    return this.value();
  }
  public get fainted() {
    return this.current <= 0;
  }
  constructor(set: StatSet, args: IHPStatEntry) {
    super("hp", set, Number.MAX_SAFE_INTEGER, args);
    this.current = args.current ?? this.value();
    if (this.current > this.max) this.current = this.max;
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

type StatEntry = PermanentStatEntry | BattleStatEntry | HPStatEntry;

export type ExperienceGroup = (level: number) => number;

export interface LevelUpReceipt {
  oldLevel: number;
  newLevel: number;
  forcedPoints?: number;
  statChange?: Record<PermanentStat, number>;
}

export interface AddExpReceipt {
  exp: number;
  levelUps: Array<LevelUpReceipt>;
}

type StatEntries = Record<PermanentStat, PermanentStatEntry> & Record<BattleStat, BattleStatEntry>;
type IStatEntries = Partial<Record<PermanentStat, IPermanentStatEntry>> & Partial<Record<BattleStat, IBattleStatEntry>>;

export type IStatSet = IStatEntries & { level?: number; points?: number };

export type StatEvents = {
  stageChange: [stat: Stat, old: number, current: number];
  stageReset: [stat: Stat, old: number];
  levelUp: [receipt: LevelUpReceipt];
  addExp: [receipt: AddExpReceipt];
};

export class StatSet extends EventEmitter<StatEvents> implements StatEntries {
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
  public get levelPercent() {
    const pointsToPrevLevel = this.group(this.level);
    const pointsToNextLevel = this.group(this.level + 1);
    return (this.points - pointsToPrevLevel) / (pointsToNextLevel - pointsToPrevLevel);
  }

  public get group() {
    return this.self.getSpecies().experienceGroup;
  }

  constructor(public readonly self: Codemon, args: IStatSet, subscriber?: (self: EventEmitter<StatEvents>) => void) {
    super();
    if (subscriber) subscriber(this);
    this.level = args.level ?? config.stats.defaultLevel;
    this.points = this.group(this.level);
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

  public async levelUp(): Promise<LevelUpReceipt>;
  public async levelUp(levels: number): Promise<LevelUpReceipt[]>;
  public async levelUp(levels?: number): Promise<LevelUpReceipt | LevelUpReceipt[]> {
    if (levels) return sequentialAsync<void, LevelUpReceipt>(new Array(levels), async () => await this.levelUp());

    const old = this.level;
    this.level += 1;
    const ret: LevelUpReceipt = {
      oldLevel: old,
      newLevel: this.level,
    };
    if (this.points < this.group(this.level)) {
      ret.forcedPoints = this.group(this.level) - this.points;
      this.points = this.group(this.level);
    }

    await this.wait("levelUp", ret);
    return ret;
  }

  public async addExp(exp: number): Promise<AddExpReceipt> {
    this.points += exp;
    const levelUps: LevelUpReceipt[] = [];
    while (this.group(this.level + 1) <= this.points) levelUps.push(await this.levelUp());
    this.wait("addExp", { exp, levelUps });
    return { exp, levelUps };
  }

  public get pointsToNextLevel() {
    return this.group(this.level + 1) - this.points;
  }

  public get percentToNextLevel() {
    return (this.points - this.group(this.level)) / (this.group(this.level + 1) - this.group(this.level));
  }

  public toString() {
    const level = `Level: ${this.level} (${this.points - this.group(this.level)}/${this.group(this.level + 1)}))`;
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
  return decide(config.randomNature, iCodemon);
}
