import C from "./config.ts";
import { Codemon } from "./codemon.ts";

// Add new stats by editing these types
export type PermanentStat = "hp" | "attack" | "defense" | "specialAttack" | "specialDefense" | "speed";
export type BattleStat = "accuracy" | "evasion";

export type Stat = PermanentStat | BattleStat;

interface IBattleStatEntry {
  stage?: number;
}

export class BattleStatEntry {
  private _stage: number;
  public get stage() {
    return this._stage;
  }

  constructor(public readonly stat: Stat, args: IBattleStatEntry) {
    this._stage = args?.stage ?? 0;
  }

  public modifyStage(modification: number) {
    const old = this._stage;
    this._stage += modification;
    this._stage = Math.max(C.codemon.stats.minStage, Math.min(this._stage, C.codemon.stats.maxStage));
    return this._stage - old;
  }

  public resetStage() {
    this._stage = 0;
  }

  public stageMultiplier(effect: number): number {
    return this.stage > 0 ? (this.stage + effect) / effect : effect / (this.stage + effect);
  }

  public toString() {
    return `${this.stat}: ${this.stage}`;
  }
}

interface IPermanentStatEntry {
  stage?: number;
  individualValue?: number;
  effortValue?: number;
}
export class PermanentStatEntry extends BattleStatEntry {
  public individualValue: number;
  public effortValue: number;
  constructor(public readonly stat: Stat, public readonly self: Codemon, args: IPermanentStatEntry) {
    super(stat, args);
    this.individualValue = args.individualValue ?? Math.floor(Math.random() * C.codemon.stats.maxIV);
    this.effortValue = args.effortValue ?? 0;
  }

  public value(considerStage = false) {
    let val =
      2 * this.self.species.baseStats[this.stat as PermanentStat] +
      this.individualValue +
      Math.floor(this.effortValue / 4);
    val = Math.floor((val * this.self.experience.level) / 100) + 5;

    const nature = considerStage ? this.self.nature : this.self.originalNature;
    const natureBuff = nature.buff === this.stat;
    const natureNerf = nature.nerf === this.stat;
    if (natureBuff && !natureNerf) val *= 1 + C.codemon.nature.statEffect;
    if (natureNerf && !natureBuff) val *= 1 - C.codemon.nature.statEffect;
    val = Math.floor(val);

    if (considerStage) {
      val *= this.stageMultiplier(2);
      val = Math.floor(val);
    }
    return val;
  }

  public toString() {
    return `${this.stat}: ${this.value(true)} (${this.stage}|${this.effortValue}|${this.individualValue})`;
  }
}

export class HPStatEntry extends PermanentStatEntry {
  public current;
  public get max() {
    return this.value();
  }
  constructor(self: Codemon, args: IPermanentStatEntry) {
    super("hp" as Stat, self, args);
    this.current = this.value();
  }

  public value(_considerStage = false) {
    let val =
      2 * this.self.species.baseStats[this.stat as PermanentStat] +
      this.individualValue +
      Math.floor(this.effortValue / 4);
    val = Math.floor((val * this.self.experience.level) / 100) + this.self.experience.level + 10;

    val = Math.floor(val);
    return val;
  }

  public toString() {
    return `${this.stat}: ${this.current}/${this.value()} (${this.effortValue}|${this.individualValue})`;
  }
}

type Stats = Record<PermanentStat, PermanentStatEntry> & Record<BattleStat, BattleStatEntry>;

export type IStats = Partial<Record<PermanentStat, IPermanentStatEntry>> &
  Partial<Record<BattleStat, IBattleStatEntry>>;

export class StatSet implements Stats {
  public hp: HPStatEntry;
  public attack: PermanentStatEntry;
  public defense: PermanentStatEntry;
  public specialAttack: PermanentStatEntry;
  public specialDefense: PermanentStatEntry;
  public speed: PermanentStatEntry;

  public accuracy: BattleStatEntry;
  public evasion: BattleStatEntry;

  constructor(args: IStats & { self: Codemon }) {
    // Feels like there should be a better way to do this
    this.hp = new HPStatEntry(args.self, { ...args.hp });
    this.attack = new PermanentStatEntry("attack", args.self, {
      ...args.attack,
    });
    this.defense = new PermanentStatEntry("defense", args.self, {
      ...args.defense,
    });
    this.specialAttack = new PermanentStatEntry("specialAttack", args.self, {
      ...args.specialAttack,
    });
    this.specialDefense = new PermanentStatEntry("specialDefense", args.self, {
      ...args.specialDefense,
    });
    this.speed = new PermanentStatEntry("speed", args.self, {
      ...args.speed,
    });

    this.accuracy = new BattleStatEntry("accuracy", {
      ...args.accuracy,
    });
    this.evasion = new BattleStatEntry("evasion", { ...args.evasion });
  }

  public toString() {
    return (
      [this.hp, this.attack, this.defense, this.specialAttack, this.specialDefense, this.speed]
        .map(s => s.toString())
        .join("\n") +
      "\n" +
      [this.accuracy, this.evasion].map(s => s.toString()).join(", ")
    );
  }
}

export type BaseStats = Record<PermanentStat, number>;
export type EVYields = Partial<Record<PermanentStat, number>>;
export type StageMods = Partial<Record<Exclude<Stat, "hp">, number>>;
