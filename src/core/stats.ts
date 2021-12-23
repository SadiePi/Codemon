import { Codemon } from "./codemon.ts"
import C from "./config.ts"

export type ValuedStat =
  | "HP"
  | "Attack"
  | "Defense"
  | "SpecialAttack"
  | "SpecialDefense"
  | "Speed"
export type UnvaluedStat = "Accuracy" | "Evasion"
export type Stat = ValuedStat | UnvaluedStat

interface IUnvaluedStatEntry {
  stage?: number
}

class UnvaluedStatEntry {
  private _stage: number
  get stage() {
    return this._stage
  }

  constructor(public readonly stat: Stat, args: IUnvaluedStatEntry) {
    this._stage = args?.stage ?? 0
  }

  public modifyStage(modification: number) {
    if (this.stat === "HP")
      throw RangeError(`Given Stat ${this.stat} does not have a stage`)

    this._stage += modification
    this._stage = Math.max(
      C.codemon.stats.minStage,
      Math.min(this._stage, C.codemon.stats.maxStage)
    )
  }

  public resetStage() {
    this._stage = 0
  }

  public stageMultiplier(effect: number): number {
    return this.stage > 0
      ? (this.stage + effect) / effect
      : effect / (this.stage + effect)
  }
}

interface IValuedStatEntry {
  stage?: number
  individualValue?: number
  effortValue?: number
}
class ValuedStatEntry extends UnvaluedStatEntry {
  public individualValue: number
  public effortValue: number
  constructor(
    public readonly stat: Stat,
    public readonly self: Codemon,
    public baseValue: number,
    args: IValuedStatEntry
  ) {
    super(stat, args)
    this.individualValue =
      args.individualValue ?? Math.floor(Math.random() * C.codemon.stats.maxIV)
    this.effortValue = args.effortValue ?? 0
  }

  public value(considerStage: boolean) {
    let val =
      2 * this.baseValue +
      this.individualValue +
      Math.floor(this.effortValue / 4)
    val = Math.floor((val * this.self.experience.level) / 100) + 5

    const natureBuff = this.self.nature(considerStage)[0] === this.stat
    const natureNerf = this.self.nature(considerStage)[1] === this.stat
    if (natureBuff && !natureNerf) val *= 1 + C.codemon.nature.statEffect
    if (natureNerf && !natureBuff) val *= 1 - C.codemon.nature.statEffect
    val = Math.floor(val)

    if (considerStage) {
      val *= this.stageMultiplier(2)
      val = Math.floor(val)
    }
    return val
  }
}

class HPStatEntry extends ValuedStatEntry {
  public current
  constructor(self: Codemon, baseValue: number, args: IValuedStatEntry) {
    super("HP", self, baseValue, args)
    this.current = this.value()
  }

  public value() {
    let val =
      2 * this.baseValue +
      this.individualValue +
      Math.floor(this.effortValue / 4)
    val =
      Math.floor((val * this.self.experience.level) / 100) +
      this.self.experience.level +
      10

    val = Math.floor(val)
    return val
  }
}

type _StatSet = {
  [S in ValuedStat]: ValuedStatEntry
} & {
  [S in UnvaluedStat]: UnvaluedStatEntry
}

export type IStats = {
  [S in UnvaluedStat]?: { stage?: number }
} & {
  [S in ValuedStat]?: {
    stage?: number
    individualValue?: number
    effortValue?: number
  }
}

export type IStatSet = { self: Codemon } & {
  [S in ValuedStat]?: IValuedStatEntry
} & {
  [S in UnvaluedStat]?: IUnvaluedStatEntry
}
export class StatSet implements _StatSet {
  public HP: HPStatEntry
  public Attack: ValuedStatEntry
  public Defense: ValuedStatEntry
  public SpecialAttack: ValuedStatEntry
  public SpecialDefense: ValuedStatEntry
  public Speed: ValuedStatEntry

  public Accuracy: UnvaluedStatEntry
  public Evasion: UnvaluedStatEntry

  constructor(args: IStatSet) {
    const base = args.self.species.baseStats

    // Feels like there should be a better way to do this
    this.HP = new HPStatEntry(args.self, base.HP, { ...args.HP })
    this.Attack = new ValuedStatEntry("Attack", args.self, base.Attack, {
      ...args.Attack,
    })
    this.Defense = new ValuedStatEntry("Defense", args.self, base.Defense, {
      ...args.Defense,
    })
    this.SpecialAttack = new ValuedStatEntry(
      "SpecialAttack",
      args.self,
      base.SpecialAttack,
      { ...args.SpecialAttack }
    )
    this.SpecialDefense = new ValuedStatEntry(
      "SpecialDefense",
      args.self,
      base.SpecialDefense,
      { ...args.SpecialDefense }
    )
    this.Speed = new ValuedStatEntry("Speed", args.self, base.Speed, {
      ...args.Speed,
    })

    this.Accuracy = new UnvaluedStatEntry("Accuracy", { ...args.Accuracy })
    this.Evasion = new UnvaluedStatEntry("Evasion", { ...args.Evasion })
  }
}

export type BaseStats = {
  [S in ValuedStat]: number
}

export type EVYields = {
  [S in ValuedStat]: number
}
