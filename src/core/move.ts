import C from "./config.ts";
import Codemon from "./codemon.ts";
import { PermanentStat, StageMods } from "./stats.ts";
import { Type } from "./type.ts";
import { Battle, StatusEffect } from "./battle.ts";

export type DamageCategory = "Physical" | "Special" | "Status";

export type TCQuantifier = "All" | "Any";
export type TCPosition = "Adjacent" | "Non-Adjacent";
// TODO? export type TCType = "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice" | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy"
export type TCAlignment = "Allies" | "Foes";

type TCQP = TCQuantifier | TCPosition | `${TCQuantifier} ${TCPosition}`;
type TCQPA = TCQP | TCAlignment | `${TCQP} ${TCAlignment}`;
export type TCString = TCQPA | "Self";

export type _TargetingCategory =
  | {
      quantifier: TCQuantifier;
      position: TCPosition;
      alignment: TCQPA;
    }
  | { alignment: "Self" };

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

// deno-lint-ignore no-explicit-any
type Weather = any;
interface WeatherMoveEffect {
  type: "Weather";
  weather: Weather;
}
interface StatusMoveEffect<B extends Battle> {
  type: "Status";
  status: StatusEffect<B>;
}
interface StatModMoveEffect extends StageMods {
  type: "StatMod";
}

interface RestrictionMoveEffect {
  type: "Restriction";
  // TODO
}

export type MoveEffect<B extends Battle> = { probability?: number } & (
  | WeatherMoveEffect
  | StatusMoveEffect<B>
  | StatModMoveEffect
  | RestrictionMoveEffect
);

interface BaseMoveData<B extends Battle = Battle> {
  category: DamageCategory;
  name: string;
  description: string;
  type: Type;
  pp: number | { new (): PPScheme };
  accuracy?: number;
  makesContact: boolean;
  target: TargetingCategory;
  ppScheme?: PPScheme;
  priority?: number;
  effect?: MoveEffect<B> | MoveEffect<B>[];
  hitAgain?: (hitCount: number) => number | boolean;
}
interface StatusMoveData<B extends Battle = Battle> extends BaseMoveData<B> {
  category: "Status";
  effect: MoveEffect<B> | MoveEffect<B>[];
}

interface PhysicalMoveData<B extends Battle = Battle> extends BaseMoveData<B> {
  category: "Physical";
  power: number; // TODO: Add Battle parameter
  recoil?: number | ((target: Codemon<B>, battle: B) => number);
  crash?: number | ((target: Codemon<B>, battle: B) => number);
  criticalHitStage?: number;
  effect?: MoveEffect<B> | MoveEffect<B>[];
}

interface SpecialMoveData<B extends Battle = Battle> extends BaseMoveData<B> {
  category: "Special";
  power: number; // TODO: Add Battle parameter
  recoil?: number | ((target: Codemon<B>, battle: B) => number);
  crash?: number | ((target: Codemon<B>, battle: B) => number);
  criticalHitStage?: number;
  effect?: MoveEffect<B> | MoveEffect<B>[];
}

export type MoveData<B extends Battle = Battle> = StatusMoveData<B> | PhysicalMoveData<B> | SpecialMoveData<B>;

export interface MoveUsage<B extends Battle = Battle> {
  user: Codemon<B>;
  targets: Codemon<B>[];
  moveData: MoveData<B>;
  damage?: {
    base: number;
    multitarget: number;
    weather: number;
    random: number;
    critical: number;
    stab: number;
    other: number;
    recoil?: MoveUsage<B>;
  };
  stats: StageMods;
  statuses: StatusEffect<B>[];
  //weather: Weather;
}

export interface MoveReciept<B extends Battle = Battle> {
  usage: MoveUsage<B>;
  target: Codemon<B>;
  damage?: number;
  fainted: boolean;
  typeBoost: number;
  stats?: StageMods;
  statuses?: StatusEffect<B>[];
  //weather: Weather;
}

export interface IMove<B extends Battle = Battle> {
  self: Codemon<B>;
  info: MoveData<B>;
}

export class Move<B extends Battle = Battle> {
  public data: MoveData<B>;
  public user: Codemon<B>;
  public PP: PPScheme;

  constructor(args: IMove<B>) {
    this.data = args.info;
    this.user = args.self;
    this.PP = typeof this.data.pp === "number" ? new PPScheme(this.data.pp) : new this.data.pp();
  }

  public Use(targets: Codemon<B>[]): MoveUsage<B> {
    if (!this.PP.Use()) {
      console.log("TODO: Fail without remaining PP");
    }
    const usage: MoveUsage<B> = {
      user: this.user,
      targets,
      moveData: this.data,
      stats: {},
      statuses: [],
    };

    this.ApplyDamage(usage, targets);
    this.ApplyEffects(usage);

    return usage;
  }

  // TODO: Complete this; it's only the rudimentary random check
  private TryCriticalHit(): boolean {
    if (this.data.category === "Status") return false;
    const crit = Math.random();
    const stage = this.data.criticalHitStage ?? 0;
    const aff = 1; // TODO: this.self.affection == max ? 1/2 : 1
    if (stage >= 3) return true;
    if (stage == 2) return crit < (1 / 2) * aff;
    if (stage == 1) return crit < (1 / 8) * aff;
    return crit < 1 / 24;
  }

  private GetCriticalMultiplier(): number {
    if (this.data.category === "Status") return 1;
    if (this.TryCriticalHit()) return C.codemon.moves.criticalMultiplier;
    return 1;
  }

  private ApplyDamage(usage: MoveUsage<B>, targets: Codemon<B>[]) {
    if (usage.moveData.category !== "Physical" && usage.moveData.category !== "Special") return;

    const stats: [PermanentStat, PermanentStat] =
      this.data.category === "Physical" ? ["attack", "defense"] : ["specialAttack", "specialDefense"];

    const critical = this.GetCriticalMultiplier();
    const multitarget = targets.length > 1 ? C.codemon.moves.multitargetMultiplier : 1;
    const random = 0.85 + Math.random() * 0.15;
    const stab = this.user.species.types.includes(usage.moveData.type) ? 1.5 : 1;

    let base = (2 * this.user.experience.level) / 5 + 2;
    base *= usage.moveData.power; // TODO apply effective power, not base
    // TODO fix this
    base *= this.user.stats[stats[0]].value(critical != 1 && this.user.stats[stats[0]].stage > 0);
    base /= this.user.stats[stats[1]].value(critical != 1 && this.user.stats[stats[1]].stage < 0);
    base = base / 50 + 2;

    usage.damage = {
      base,
      critical,
      stab,
      weather: 1,
      multitarget,
      random,
      other: 1,
    };
  }

  private ApplyEffects(usage: MoveUsage<B>) {
    if (!usage.moveData.effect) return;
    if (Array.isArray(usage.moveData.effect)) usage.moveData.effect.forEach(e => this.ApplyEffect(usage, e));
    else this.ApplyEffect(usage, usage.moveData.effect);
  }

  private ApplyEffect(usage: MoveUsage<B>, effect: MoveEffect<B>) {
    if (effect.probability && Math.random() > effect.probability) return;
    switch (effect.type) {
      case "Weather":
        this.ApplyWeather(usage, effect);
        break;
      case "StatMod":
        this.ApplyStatStage(usage, effect);
        break;
      case "Status":
        this.ApplyStatus(usage, effect);
        break;
    }
  }

  // deno-lint-ignore no-unused-vars
  private ApplyWeather(usage: MoveUsage<B>, weather: Weather) {
    // TODO
  }

  private ApplyStatStage(usage: MoveUsage<B>, effect: StatModMoveEffect) {
    const stats = usage.stats ?? {};
    if (effect.attack) stats.attack = (stats.attack ?? 0) + effect.attack;
    if (effect.defense) stats.defense = (stats.defense ?? 0) + effect.defense;
    if (effect.specialAttack) stats.specialAttack = (stats.specialAttack ?? 0) + effect.specialAttack;
    if (effect.specialDefense) stats.specialDefense = (stats.specialDefense ?? 0) + effect.specialDefense;
    if (effect.speed) stats.speed = (stats.speed ?? 0) + effect.speed;
    if (effect.accuracy) stats.accuracy = (stats.accuracy ?? 0) + effect.accuracy;
    if (effect.evasion) stats.evasion = (stats.evasion ?? 0) + effect.evasion;
    usage.stats = stats;
  }

  private ApplyStatus(usage: MoveUsage<B>, effect: StatusMoveEffect<B>) {
    const statuses = usage.statuses ?? [];
    statuses.push(effect.status);
    usage.statuses = statuses;
  }

  public toString() {
    return `${this.data.name} - ${this.data.type.name}/${this.data.category} - ${this.PP.current}/${this.PP.max} (${this.PP.boosts})`;
  }
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
