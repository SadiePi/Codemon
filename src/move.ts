import { MAX_ALLOWED_PP_BOOSTS, MULTITARGET_DAMAGE_MULTIPLIER, PERCENT_BASE_PP_PER_BOOST } from "./constants.ts";
import { Stat, Codemon } from "./codemon.ts";

export interface Type {
  weaknesses: Type[];
  resistances: Type[];
  immunities: Type[];
}

export const TypeNone: Type = {
  weaknesses: [],
  resistances: [],
  immunities: [],
};

export enum DamageCategory {
  Physical,
  Special,
  Status,
}

export enum TargetingCategory {
  Any,
  AnyAllyIncludingSelf,
  AnyAllyExcludingSelf,
  AnyFoe,

  AnyAdjacent,
  AnyAdjacentAllyIncludingSelf,
  AnyAdjacentAllyExcludingSelf,
  AnyAdjacentFoe,

  AnyNonAdjacent,
  AnyNonAdjacentAlly,
  AnyNonAdjacentFoe,

  All,
  AllAlliesIncludingSelf,
  AllAlliesExcludingSelf,
  AllFoes,

  AllAdjacent,
  AllAdjacentAlliesIncludingSelf,
  AllAdjacentAlliesExcludingSelf,
  AllAdjacentFoes,

  AllNonAdjacent,
  AllNonAdjacentAllies,
  AllNonAdjacentFoes,

  Self,
}

export interface MoveInfo {
  name: string;
  type: Type;
  basePP: number;
  priority: number;
  basePower: number; // TODO: Add Battle parameter
  baseAccuracy: number;
  makesContact: boolean;
  criticalHitStage: number;
  damageCategory: DamageCategory;
  targetingCategory: TargetingCategory; // TODO: Feels like this could be better
  criticalHitProbabilityMultiplier: number;
}

export interface MoveReport {
  damage: number;
  criticalHit: boolean;
  recoil?: MoveReport;
}

export class Move {
  public maxPP: number;
  public currentPP: number;
  private PPBoosts: number;

  constructor(public info: MoveInfo) {
    this.maxPP = this.currentPP = this.info.basePP;
    this.PPBoosts = 0;
  }

  public UsePP(pp: number = 1): boolean {
    if (this.currentPP >= pp) {
      this.currentPP -= pp;
      return true;
    }
    return false;
  }

  public RestorePP(pp: number): number {
    if (this.currentPP + pp > this.maxPP) pp = this.maxPP - this.currentPP;
    this.currentPP += pp;
    return pp;
  }

  public RestoreAllPP(): number {
    const restored = this.maxPP - this.currentPP;
    this.currentPP = this.maxPP;
    return restored;
  }

  public BoostMaxPP(): boolean {
    if (this.CanBoostMaxPP()) {
      this.maxPP += this.info.basePP * PERCENT_BASE_PP_PER_BOOST;
      this.PPBoosts++;
      return true;
    }
    return false;
  }

  public CanBoostMaxPP(): boolean {
    return this.PPBoosts < MAX_ALLOWED_PP_BOOSTS;
  }

  // TODO: Complete this; it's only the rudimentary random check
  public CriticalHit(): boolean {
    const crit = Math.random();
    if(this.info.criticalHitStage >= 3) return true;
    if(this.info.criticalHitStage == 2) return crit < 1/2;
    if(this.info.criticalHitStage == 1) return crit < 1/8;
    return crit < 1/24;
  }

  // refactoring to do here, should be on Codemon as "RecieveMove"
  public Use(user: Codemon, target: Codemon, multipleTargets: boolean): MoveReport {
    const r: MoveReport = {damage:0,criticalHit:false};

    if (this.info.damageCategory !== DamageCategory.Status) {
      r.criticalHit = this.CriticalHit();

      r.damage = (2/5) * user.level + 2;
      r.damage *= this.info.basePower; // TODO: Use effective power
      r.damage *= user.stat(
        this.info.damageCategory === DamageCategory.Physical
          ? Stat.Attack
          : Stat.SpecialAttack,
        true
      );
      if(r.criticalHit)
        r.damage /= target.stat(
          this.info.damageCategory === DamageCategory.Physical
            ? Stat.Defense
            : Stat.SpecialDefense,
          true
        );
      r.damage = r.damage/50 + 2;

      if(multipleTargets) r.damage *= MULTITARGET_DAMAGE_MULTIPLIER;
      // TODO: Consider weather
    }

    return r;
  }

}
