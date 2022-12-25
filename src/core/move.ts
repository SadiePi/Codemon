import C from "./config.ts";
import { Action, ActionSource } from "./battle.ts";
import { Codemon, EffectSource, Type } from "./index.ts";
import { ActionUseContext, Attack, EffectDecider } from "../index.ts";

export type DamageCategory = "Physical" | "Special" | "Status";

export const TCQuantifiers = ["Every", "Any", "Random"] as const;
export type TCQuantifier = typeof TCQuantifiers[number];
export const TCPositions = ["Adjacent", "Non-Adjacent"] as const;
export type TCPosition = typeof TCPositions[number];
// TODO? export type TCType = "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice" | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy"
export const TCAlignment = ["Ally", "Foe"] as const;
export type TCAlignment = typeof TCAlignment[number];
export const TCSpecials = ["Self", "Team", "All"] as const;
export type TCSpecial = typeof TCSpecials[number];
export type TargetingCategory =
  | TCSpecial
  | TCQuantifier
  | `${TCQuantifier} ${TCPosition}`
  | `${TCQuantifier} ${TCAlignment}`
  | `${TCQuantifier} ${TCPosition} ${TCAlignment}`;

export type Move = EffectSource & {
  name: string;
  description: string;
  type: Type;
  category: DamageCategory;
  priority?: number;
  power?: number;
  pp: number | { new (): PPScheme };
  makesContact: boolean;
  criticalHitStage?: number;
};

export interface IMoveEntry {
  self: Codemon;
  move: Move;
}

export class MoveEntry implements ActionSource {
  public priority?: number;
  public targetingCategory: TargetingCategory;
  public effects: Move;
  public user: Codemon;
  public PP: PPScheme;

  constructor(args: IMoveEntry) {
    this.effects = args.move;
    this.user = args.self;
    this.PP = typeof this.effects.pp === "number" ? new PPScheme(this.effects.pp) : new this.effects.pp();
    this.priority = this.effects.priority;
    this.targetingCategory = this.effects.target;
  }

  useAction(context: ActionUseContext): Action {
    if (!this.PP.Use()) console.log("TODO: Fail without remaining PP");
    // TODO: Handle conflicting power and attack effects
    // for now, explicit attack effects simply override the power
    // TODO: Generate attack effect from power
    return new Action({
      effects: this.effects,
      source: this,
      targets: context.targets,
    });
  }

  // TODO: Complete this; it's only the rudimentary random check
  private TryCriticalHit(): boolean {
    if (this.effects.category === "Status") return false;
    const crit = Math.random();
    const stage = this.effects.criticalHitStage ?? 0;
    const aff = 1; // TODO: this.self.affection == max ? 1/2 : 1
    if (stage >= 3) return true;
    if (stage == 2) return crit < (1 / 2) * aff;
    if (stage == 1) return crit < (1 / 8) * aff;
    return crit < 1 / 24;
  }

  private GetCriticalMultiplier(): number {
    return this.TryCriticalHit() ? C.codemon.moves.criticalMultiplier : 1;
  }

  /*private GetAttack(usage: ReadyAction, targets: ActionTarget[], _battle: Battle): Attack {
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

    return {
      base,
      critical,
      stab,
      weather: 1,
      multitarget,
      random,
      other: 1,
    };
  }*/

  public toString() {
    return `${this.effects.name} - ${this.effects.type.name}/${this.effects.category} - ${this.PP.current}/${this.PP.max} (${this.PP.boosts})`;
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
