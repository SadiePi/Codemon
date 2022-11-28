import C from "./config.ts";
import Codemon from "./codemon.ts";
import { PermanentStat, StageMods } from "./stats.ts";
import { Type } from "./type.ts";
import { Action, Battle, StatusEffect, ActionSource, Weather } from "./battle.ts";

export type DamageCategory = "Physical" | "Special" | "Status";

export type TCQuantifier = "All" | "Any";
export type TCPosition = "Adjacent" | "Non-Adjacent";
// TODO? export type TCType = "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice" | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy"
export type TCAlignment = "Allies" | "Foes";

type TCQP = TCQuantifier | `${TCQuantifier} ${TCPosition}`;
type TCQPA = TCQP | `${TCQP} ${TCAlignment}`;
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

export type MoveEffect = { probability?: number } & (
  | { type: "Weather"; weather: Weather }
  | { type: "Status"; status: StatusEffect }
  | ({ type: "StatMod" } & StageMods)
  | { type: "Restriction" }
  | { type: "HP"; hp: number }
  | { type: "Faint" }
  | { type: "Leech"; ratio: number }
  | { type: "Eject" }
);

interface BaseMoveData {
  category: DamageCategory;
  name: string;
  description: string;
  type: Type;
  pp: number | { new (): PPScheme };
  accuracy?: number;
  makesContact: boolean;
  target: TargetingCategory | TCString;
  ppScheme?: PPScheme;
  priority?: number;
  effect?: MoveEffect | MoveEffect[];
  hitAgain?: (hitCount: number) => number | boolean;
}
interface StatusMoveData extends BaseMoveData {
  category: "Status";
  effect: MoveEffect | MoveEffect[];
}

interface PhysicalMoveData extends BaseMoveData {
  category: "Physical";
  power: number; // TODO: Add Battle parameter
  recoil?: number | ((target: Codemon, battle: Battle) => number);
  crash?: number | ((target: Codemon, battle: Battle) => number);
  criticalHitStage?: number;
  effect?: MoveEffect | MoveEffect[];
}

interface SpecialMoveData extends BaseMoveData {
  category: "Special";
  power: number; // TODO: Add Battle parameter
  recoil?: number | ((target: Codemon, battle: Battle) => number);
  crash?: number | ((target: Codemon, battle: Battle) => number);
  criticalHitStage?: number;
  effect?: MoveEffect | MoveEffect[];
}

export type MoveData = StatusMoveData | PhysicalMoveData | SpecialMoveData;

export interface IMove {
  self: Codemon;
  info: MoveData;
}

export class Move {
  public data: MoveData;
  public user: Codemon;
  public PP: PPScheme;
  public readonly actionSource: ActionSource;

  constructor(args: IMove) {
    this.data = args.info;
    this.user = args.self;
    this.PP = typeof this.data.pp === "number" ? new PPScheme(this.data.pp) : new this.data.pp();

    this.actionSource = {
      type: "Move",
      move: this,
      priority: this.data.priority ?? 0,
      use: (targets, battle) => {
        if (!this.PP.Use()) console.log("TODO: Fail without remaining PP");

        const action = new Action(this.actionSource, targets);

        this.ApplyDamage(action, targets, battle);
        this.ApplyEffects(action, targets, battle);

        return action;
      },
    };
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
    return this.TryCriticalHit() ? C.codemon.moves.criticalMultiplier : 1;
  }

  private ApplyDamage(usage: Action, targets: Codemon[], battle: Battle) {
    if (this.data.category !== "Physical" && this.data.category !== "Special") return;

    const stats: [PermanentStat, PermanentStat] =
      this.data.category === "Physical" ? ["attack", "defense"] : ["specialAttack", "specialDefense"];

    const critical = this.GetCriticalMultiplier();
    const multitarget = targets.length > 1 ? C.codemon.moves.multitargetMultiplier : 1;
    const random = 0.85 + Math.random() * 0.15;
    const stab = this.user.species.types.includes(this.data.type) ? 1.5 : 1;

    let base = (2 * this.user.experience.level) / 5 + 2;
    base *= this.data.power; // TODO apply effective power, not base
    // TODO fix this
    base *= this.user.stats[stats[0]].value(critical != 1 && this.user.stats[stats[0]].stage > 0);
    base /= this.user.stats[stats[1]].value(critical != 1 && this.user.stats[stats[1]].stage < 0);
    base = base / 50 + 2;

    usage.attack = {
      base,
      critical,
      stab,
      weather: 1,
      multitarget,
      random,
      other: 1,
    };
  }

  private ApplyEffects(usage: Action, targets: Codemon[], battle: Battle) {
    if (!this.data.effect) return;
    if (Array.isArray(this.data.effect)) this.data.effect.forEach(e => this.TryApplyEffect(usage, e, targets, battle));
    else this.TryApplyEffect(usage, this.data.effect, targets, battle);
  }

  private TryApplyEffect(usage: Action, effect: MoveEffect, targets: Codemon[], battle: Battle) {
    if (effect.probability && Math.random() > effect.probability) return;
    this.ApplyEffect(usage, effect, targets, battle);
  }

  private ApplyEffect(usage: Action, effect: MoveEffect, targets: Codemon[], battle: Battle) {
    switch (effect.type) {
      case "Weather":
        this.ApplyWeather(usage, effect.weather, battle);
        break;
      case "StatMod":
        this.ApplyStatStage(usage, effect, targets, battle);
        break;
      case "Status":
        this.ApplyStatus(usage, effect.status, targets, battle);
        break;
      default:
        console.log("TODO: Implement effect", effect);
    }
  }

  private ApplyWeather(usage: Action, weather: Weather, battle: Battle) {
    usage.weather = weather;
  }

  private ApplyStatStage(usage: Action, effect: StageMods, targets: Codemon[], battle: Battle) {
    const stats = usage.stage ?? {};
    if (effect.attack) stats.attack = (stats.attack ?? 0) + effect.attack;
    if (effect.defense) stats.defense = (stats.defense ?? 0) + effect.defense;
    if (effect.specialAttack) stats.specialAttack = (stats.specialAttack ?? 0) + effect.specialAttack;
    if (effect.specialDefense) stats.specialDefense = (stats.specialDefense ?? 0) + effect.specialDefense;
    if (effect.speed) stats.speed = (stats.speed ?? 0) + effect.speed;
    if (effect.accuracy) stats.accuracy = (stats.accuracy ?? 0) + effect.accuracy;
    if (effect.evasion) stats.evasion = (stats.evasion ?? 0) + effect.evasion;
    usage.stage = stats;
  }

  private ApplyStatus(usage: Action, effect: StatusEffect, targets: Codemon[], battle: Battle) {
    const statuses = usage.statuses ?? [];
    statuses.push(effect);
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
