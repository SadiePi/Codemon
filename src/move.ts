import { Action, ActionSource, ActionUseContext, EffectParams, EffectSource, TargetContext } from "./battle.ts";
import { Codemon, Type } from "./codemon.ts";
import { config } from "./config.ts";
import { Decider, decide, range } from "./decision.ts";

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
  pp: number | { new (): PPScheme };
  makesContact: boolean;
  criticalHitStage?: number;
  charge?: Decider<EffectParams>;
  continue?: Decider<EffectParams>;
};

export interface IMoveEntry {
  user: Codemon;
  move: Move;
}

export class MoveEntry implements ActionSource {
  public priority?: number;
  public targetingCategory: TargetingCategory;
  public effects: Move;
  public user: Codemon;
  public pp: PPScheme;

  constructor(args: IMoveEntry) {
    this.effects = args.move;
    this.user = args.user;
    this.pp = typeof this.effects.pp === "number" ? new PPScheme(this.effects.pp) : new this.effects.pp();
    this.priority = this.effects.priority;
    this.targetingCategory = this.effects.target;
  }

  useAction(context: ActionUseContext): Action | null {
    if (this.user.stats.hp.current <= 0) return null;
    if (!this.pp.use()) return null;

    const ret = new Action({
      battle: context.battle,
      user: this.user,
      effect: this.effects,
      source: this,
      targets: context.plan.targets,
    });

    ret.message(`${this.user.name} used ${this.effects.name}!`);
    return ret;
  }

  // TODO: Complete this; it's only the rudimentary random check
  public TryCriticalHit(): boolean {
    if (this.effects.category === "Status") return false;
    const crit = Math.random();
    const stage = this.effects.criticalHitStage ?? 0;
    const aff = 1; // TODO: this.self.affection == max ? 1/2 : 1
    if (stage >= 3) return true;
    if (stage == 2) return crit < (1 / 2) * aff;
    if (stage == 1) return crit < (1 / 8) * aff;
    return crit < 1 / 24;
  }

  public GetCriticalMultiplier(): number {
    return this.TryCriticalHit() ? config.moves.criticalMultiplier : 1;
  }
  public toString() {
    return `${this.effects.name} - ${this.effects.type.name}/${this.effects.category} - ${this.pp.current}/${this.pp.max} (${this.pp.boosts})`;
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

  public use(pp = 1): boolean {
    if (this._current < pp) return false;
    this._current -= pp;
    return true;
  }

  public restore(pp: number): number {
    pp = pp ?? this._max - this._current;
    const prev = this._current;
    this._current += pp;
    if (this._current > this._max) this._current = this._max;
    return this._current - prev;
  }

  public canBoost(): boolean {
    return this._boosts < config.moves.maxPPBoosts;
  }

  public boost(): number {
    if (!this.canBoost()) return 0;
    this._boosts++;
    const change = this.base * config.moves.ppBoostMultiplier;
    this._max += change;
    this._current += change;
    return change;
  }
}

// Utility deciders for moves
export function multiHit(min: number, max: number): Decider<boolean, TargetContext & { hitsSoFar: number }> {
  const hits = decide(range(min, max), undefined);
  return ({ hitsSoFar }) => {
    return hitsSoFar < hits;
  };
}
