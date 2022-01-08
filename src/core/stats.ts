import { Codemon } from "./codemon.ts";
import C from "./config.ts";

export enum PermanentStat {
  HP = "HP",
  Attack = "Attack",
  Defense = "Defense",
  SpecialAttack = "SpecialAttack",
  SpecialDefense = "SpecialDefense",
  Speed = "Speed",
}
export enum BattleStat {
  Accuracy = "Accuracy",
  Evasion = "Evasion",
}
export type Stat = PermanentStat | BattleStat;

interface IBattleStatEntry {
  stage?: number;
}

class BattleStatEntry {
  private _stage: number;
  get stage() {
    return this._stage;
  }

  constructor(public readonly stat: Stat, args: IBattleStatEntry) {
    this._stage = args?.stage ?? 0;
  }

  public modifyStage(modification: number) {
    if (this.stat === "HP")
      throw RangeError(`Stat ${this.stat} does not have a stage`);

    this._stage += modification;
    this._stage = Math.max(
      C.codemon.stats.minStage,
      Math.min(this._stage, C.codemon.stats.maxStage)
    );
  }

  public resetStage() {
    this._stage = 0;
  }

  public stageMultiplier(effect: number): number {
    return this.stage > 0
      ? (this.stage + effect) / effect
      : effect / (this.stage + effect);
  }
}

interface IPermanentStatEntry {
  stage?: number;
  individualValue?: number;
  effortValue?: number;
}
class ParmanentStatEntry extends BattleStatEntry {
  public individualValue: number;
  public effortValue: number;
  constructor(
    public readonly stat: Stat,
    public readonly self: Codemon,
    public baseValue: number,
    args: IPermanentStatEntry
  ) {
    super(stat, args);
    this.individualValue =
      args.individualValue ?? Math.floor(Math.random() * C.codemon.stats.maxIV);
    this.effortValue = args.effortValue ?? 0;
  }

  public value(considerStage: boolean) {
    let val =
      2 * this.baseValue +
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
}

class HPStatEntry extends ParmanentStatEntry {
  public current;
  constructor(self: Codemon, baseValue: number, args: IPermanentStatEntry) {
    super("HP" as Stat, self, baseValue, args);
    this.current = this.value();
  }

  public value() {
    let val =
      2 * this.baseValue +
      this.individualValue +
      Math.floor(this.effortValue / 4);
    val =
      Math.floor((val * this.self.experience.level) / 100) +
      this.self.experience.level +
      10;

    val = Math.floor(val);
    return val;
  }

  // TODO err on stage operations
}

type Stats = {
  [S in PermanentStat]: ParmanentStatEntry;
} & {
  [S in BattleStat]: BattleStatEntry;
};

export type IStats = {
  [S in PermanentStat]?: IPermanentStatEntry;
} & {
  [S in BattleStat]?: IBattleStatEntry;
};

export class StatSet implements Stats {
  public HP: HPStatEntry;
  public Attack: ParmanentStatEntry;
  public Defense: ParmanentStatEntry;
  public SpecialAttack: ParmanentStatEntry;
  public SpecialDefense: ParmanentStatEntry;
  public Speed: ParmanentStatEntry;

  public Accuracy: BattleStatEntry;
  public Evasion: BattleStatEntry;

  constructor(args: IStats & { self: Codemon }) {
    const base = args.self.species.baseStats;

    // Feels like there should be a better way to do this
    this.HP = new HPStatEntry(args.self, base.HP, { ...args.HP });
    this.Attack = new ParmanentStatEntry(
      "Attack" as Stat,
      args.self,
      base.Attack,
      {
        ...args.Attack,
      }
    );
    this.Defense = new ParmanentStatEntry(
      "Defense" as Stat,
      args.self,
      base.Defense,
      {
        ...args.Defense,
      }
    );
    this.SpecialAttack = new ParmanentStatEntry(
      "SpecialAttack" as Stat,
      args.self,
      base.SpecialAttack,
      { ...args.SpecialAttack }
    );
    this.SpecialDefense = new ParmanentStatEntry(
      "SpecialDefense" as Stat,
      args.self,
      base.SpecialDefense,
      { ...args.SpecialDefense }
    );
    this.Speed = new ParmanentStatEntry(
      "Speed" as Stat,
      args.self,
      base.Speed,
      {
        ...args.Speed,
      }
    );

    this.Accuracy = new BattleStatEntry("Accuracy" as Stat, {
      ...args.Accuracy,
    });
    this.Evasion = new BattleStatEntry("Evasion" as Stat, { ...args.Evasion });
  }
}

export type BaseStats = {
  [S in PermanentStat]: number;
};

export type EVYields = {
  [S in PermanentStat]?: number;
};
