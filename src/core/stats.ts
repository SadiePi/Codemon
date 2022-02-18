import Codemon from "./codemon.ts";
import C from "./config.ts";

export type PermanentStat =
  | "HP"
  | "Attack"
  | "Defense"
  | "SpecialAttack"
  | "SpecialDefense"
  | "Speed";

export type BattleStat = "Accuracy" | "Evasion";

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
export class PermanentStatEntry extends BattleStatEntry {
  public individualValue: number;
  public effortValue: number;
  constructor(
    public readonly stat: Stat,
    public readonly self: Codemon,
    args: IPermanentStatEntry
  ) {
    super(stat, args);
    this.individualValue =
      args.individualValue ?? Math.floor(Math.random() * C.codemon.stats.maxIV);
    this.effortValue = args.effortValue ?? 0;
  }

  public value(considerStage: boolean = false) {
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
}

export class HPStatEntry extends PermanentStatEntry {
  public current;
  constructor(self: Codemon, args: IPermanentStatEntry) {
    super("HP" as Stat, self, args);
    this.current = this.value();
  }

  public value(considerStage: boolean = false) {
    let val =
      2 * this.self.species.baseStats[this.stat as PermanentStat] +
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
  [S in PermanentStat]: PermanentStatEntry;
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
  public Attack: PermanentStatEntry;
  public Defense: PermanentStatEntry;
  public SpecialAttack: PermanentStatEntry;
  public SpecialDefense: PermanentStatEntry;
  public Speed: PermanentStatEntry;

  public Accuracy: BattleStatEntry;
  public Evasion: BattleStatEntry;

  constructor(args: IStats & { self: Codemon }) {
    const base = args.self.species.baseStats;

    // Feels like there should be a better way to do this
    this.HP = new HPStatEntry(args.self, { ...args.HP });
    this.Attack = new PermanentStatEntry("Attack", args.self, {
      ...args.Attack,
    });
    this.Defense = new PermanentStatEntry("Defense", args.self, {
      ...args.Defense,
    });
    this.SpecialAttack = new PermanentStatEntry("SpecialAttack", args.self, {
      ...args.SpecialAttack,
    });
    this.SpecialDefense = new PermanentStatEntry("SpecialDefense", args.self, {
      ...args.SpecialDefense,
    });
    this.Speed = new PermanentStatEntry("Speed", args.self, {
      ...args.Speed,
    });

    this.Accuracy = new BattleStatEntry("Accuracy", {
      ...args.Accuracy,
    });
    this.Evasion = new BattleStatEntry("Evasion", { ...args.Evasion });
  }
}

export type BaseStats = {
  [S in PermanentStat]: number;
};

export type EVYields = {
  [S in PermanentStat]?: number;
};
