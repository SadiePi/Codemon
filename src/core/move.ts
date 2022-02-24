import C from "./config.ts";
import Codemon from "./codemon.ts";
import { PermanentStat } from "./stats.ts";
import { Type } from "./type.ts";

export type DamageCategory = "Physical" | "Special" | "Status";

// eg move.targetingCategory = TC.All | TC.NonAdjacent | TC.Foes
export enum TargetingCategory {
  None = 0,
  Self = 1 << 0,
  Ally = 1 << 1,
  Foe = 1 << 2,
  Adjacent = 1 << 3,
  NonAdjacent = 1 << 4,
  All = 1 << 5, // target all that match other filters instead of one
}
export const TC = TargetingCategory; // for convenience

export interface MoveInfo {
  name: string;
  type: Type;
  basePP: number;
  recoilFactor?: number;
  priority: number;
  ppScheme?: PPScheme;
  basePower: number; // TODO: Add Battle parameter
  baseAccuracy: number;
  makesContact: boolean;
  criticalHitStage: number;
  damageCategory: DamageCategory;
  targetingCategory: TargetingCategory;
  criticalHitProbabilityMultiplier: number;

  overrideMoveUsage?: (
    move: Move,
    target: Codemon,
    multitarget: boolean,
    moveUsage: MoveUsage
  ) => MoveUsage;
}

export class PPScheme {
  private base: number;
  private _current: number;
  public get current() {
    return this._current;
  }
  private _max: number;
  public get max() {
    return this._max;
  }
  private _boosts = 0;
  public get boosts() {
    return this._boosts;
  }

  constructor(base: number) {
    this.base = this._max = this._current = base;
  }

  public Use(pp = 1): boolean {
    if (this._current < pp) return false;
    this._current -= pp;
    return true;
  }

  public Restore(pp: number): number {
    pp = pp ?? this._max - this._current;
    const prev = this._current;
    this._current += pp;
    if (this._current > this._max) this._current = this._max;
    return this._current - prev;
  }

  public CanBoost(): boolean {
    return this._boosts < C.codemon.moves.maxPPBoosts;
  }

  public Boost(): number {
    if (!this.CanBoost()) return 0;
    this._boosts++;
    const change = this.base * C.codemon.moves.ppBoostMultiplier;
    this._max += change;
    this._current += change;
    return change;
  }
}

export interface MoveUsage {
  user: Codemon;
  info: MoveInfo;
  base: number;
  multitarget: number;
  weather: number;
  random: number;
  critical: number;
  stab: number;
  type: number;
  other: number;
  recoil: MoveUsage;
}

export interface MoveReport {
  user: Codemon;
  target: Codemon;
  usage: MoveUsage;
  damage: number;
  // inflictedStatuses
}

export interface IMove {
  self: Codemon;
  info: MoveInfo;
}

export class Move {
  public info: MoveInfo;
  public PP: PPScheme;
  public user: Codemon;

  constructor(args: IMove) {
    this.info = args.info;
    this.user = args.self;
    this.PP = this.info.ppScheme ?? new PPScheme(this.info.basePP);
  }

  // TODO: Complete this; it's only the rudimentary random check
  public TryCriticalHit(): boolean {
    const crit = Math.random();
    const aff = 1; // TODO: this.self.affection == max ? 1/2 : 1
    if (this.info.criticalHitStage >= 3) return true;
    if (this.info.criticalHitStage == 2) return crit < (1 / 2) * aff;
    if (this.info.criticalHitStage == 1) return crit < (1 / 8) * aff;
    return crit < 1 / 24;
  }

  public Use(
    target: Codemon,
    multitarget: boolean // TODO replace with check of TargetingCategory
    //battle: Battle
  ): MoveUsage {
    const ret: MoveUsage = {} as MoveUsage;
    const stats: [PermanentStat, PermanentStat] =
      this.info.damageCategory === "Physical"
        ? ["attack", "defense"]
        : ["specialAttack", "specialDefense"];

    ret.user = this.user;
    ret.info = this.info;
    ret.critical = this.TryCriticalHit()
      ? C.codemon.moves.criticalMultiplier
      : 1;

    ret.base = (2 * this.user.experience.level) / 5 + 2;
    ret.base *= ret.info.basePower; // TODO apply effective power, not base
    // TODO fix?
    ret.base *= this.user.stats[stats[0]].value(
      ret.critical != 1 && this.user.stats[stats[0]].stage > 0
    );
    ret.base /= this.user.stats[stats[1]].value(
      ret.critical != 1 && this.user.stats[stats[1]].stage < 0
    );
    ret.base = ret.base / 50 + 2;

    ret.multitarget = multitarget ? 0.75 : 1; // TODO battle.multitargetDamageMultipler : 1
    ret.weather = 1; // TODO check battle weather
    ret.random = 0.85 + Math.random() * 0.15;
    ret.stab = this.user.species.types.includes(ret.info.type) ? 1.5 : 1;

    ret.type = 1;
    target.species.types.forEach((t) => {
      if (t.immunities.includes(ret.info.type)) ret.type *= 0;
      else if (t.resistances.includes(ret.info.type)) ret.type /= 2;
      else if (t.weaknesses.includes(ret.info.type)) ret.type *= 2;
    });

    ret.other = 1;
    ret.recoil = {} as MoveUsage;

    // TODO apply self's abilities etc

    return ret.info.overrideMoveUsage?.(this, target, multitarget, ret) ?? ret;
  }

  public toString() {
    return `${this.info.name} - ${this.info.type.name}/${this.info.damageCategory} - ${this.PP.current}/${this.PP.max} (${this.PP.boosts})`;
  }
}

export type IMoves = MoveInfo[];
