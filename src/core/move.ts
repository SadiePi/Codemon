import C from "./config.ts";
import Codemon from "./codemon.ts";
import { PermanentStat } from "./stats.ts";
import { Type } from "./type.ts";
import Types from "../base/types.ts";

export enum DamageCategory {
  Physical,
  Special,
  Status,
}

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

export interface IMove {
  name: string;
  type: Type;
  basePP: number;
  recoil?: IMove;
  priority: number;
  ppScheme?: PPScheme;
  basePower: number; // TODO: Add Battle parameter
  baseAccuracy: number;
  makesContact: boolean;
  criticalHitStage: number;
  damageCategory: DamageCategory;
  targetingCategory: TargetingCategory; // TODO: Feels like this could be better
  criticalHitProbabilityMultiplier: number;
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
  private boosts = 0;

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
    return this.boosts < C.codemon.moves.maxPPBoosts;
  }

  public Boost(): number {
    if (!this.CanBoost()) return 0;
    this.boosts++;
    const change = this.base * C.codemon.moves.ppBoostMultiplier;
    this._max += change;
    this._current += change;
    return change;
  }
}

export interface MoveUsage {
  user: Codemon;
  move: IMove;
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

export class Move {
  public PP: PPScheme;

  constructor(private self: Codemon, public args: IMove) {
    this.PP = args.ppScheme ?? new PPScheme(args.basePP);
  }

  // TODO: Complete this; it's only the rudimentary random check
  public TryCriticalHit(): boolean {
    const crit = Math.random();
    const aff = 1; // TODO: this.self.affection == max ? 1/2 : 1
    if (this.args.criticalHitStage >= 3) return true;
    if (this.args.criticalHitStage == 2) return crit < (1 / 2) * aff;
    if (this.args.criticalHitStage == 1) return crit < (1 / 8) * aff;
    return crit < 1 / 24;
  }

  public Use(
    target: Codemon,
    multitarget: boolean // TODO replace with check of TargetingCategory
    //battle: Battle
  ): MoveUsage {
    const ret: MoveUsage = {} as MoveUsage;
    const stats: [PermanentStat, PermanentStat] =
      this.args.damageCategory === DamageCategory.Physical
        ? ["Attack", "Defense"]
        : ["SpecialAttack", "SpecialDefense"];

    ret.user = this.self;
    ret.move = this.args;
    ret.critical = this.TryCriticalHit()
      ? C.codemon.moves.criticalMultiplier
      : 1;

    ret.base = (2 * this.self.experience.level) / 5 + 2;
    ret.base *= this.args.basePower; // TODO apply effective power, not base
    // TODO fix?
    ret.base *= this.self.stats[stats[0]].value(
      ret.critical != 1 && this.self.stats[stats[0]].stage > 0
    );
    ret.base /= this.self.stats[stats[1]].value(
      ret.critical != 1 && this.self.stats[stats[1]].stage < 0
    );
    ret.base = ret.base / 50 + 2;

    ret.multitarget = multitarget ? 0.75 : 1; // TODO battle.multitargetDamageMultipler : 1
    ret.weather = 1; // TODO check battle weather
    ret.random = 0.85 + Math.random() * 0.15;
    ret.stab = this.self.species.types.includes(this.args.type) ? 1.5 : 1;

    ret.type = 1;
    target.species.types.forEach((t) => {
      if (t.immunities.includes(this.args.type)) ret.type *= 0;
      else if (t.resistances.includes(this.args.type)) ret.type /= 2;
      else if (t.weaknesses.includes(this.args.type)) ret.type *= 2;
    });

    ret.other = 1;
    ret.recoil = {} as MoveUsage;

    // TODO apply self's abilities etc

    return ret;
  }
}
