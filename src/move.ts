import {
  ActionSource,
  ActionUseContext,
  Action,
  BaseEffectSource,
  BattleBuilderParams,
  Effects,
  TargetContext,
  TargetingCategory,
} from "./battle/core/mod.ts";
import { TraditionalBBP as T } from "./battle/traditional.ts";
import { Codemon } from "./codemon.ts";
import { config } from "./config.ts";
import { Decider, decide, range } from "./decision.ts";
import { EventEmitter } from "./external.ts";
import { Type } from "./species.ts";

export type DamageCategory = "Physical" | "Special" | "Status";

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

export type Move = BaseEffectSource<T> & {
  type: Type;
  category: DamageCategory;
  priority?: number;
  pp: number | { new (): PPScheme };
  makesContact: boolean;
  criticalHitStage?: number;
  charge?: Decider<Effects<T>>;
  continue?: Decider<Effects<T>>;
};

export interface IMoveEntry {
  user: Codemon;
  move: Move;
}

export class MoveEntry implements ActionSource<T> {
  public priority?: number;
  public target: TargetingCategory<T>;
  public effects: Move;
  public user: Codemon;
  public pp: PPScheme;

  constructor(args: IMoveEntry) {
    this.effects = args.move;
    this.user = args.user;
    this.pp = typeof this.effects.pp === "number" ? new PPScheme(this.effects.pp) : new this.effects.pp();
    this.priority = this.effects.priority;
    this.target = this.effects.target;
  }

  traditionalAction(context: ActionUseContext<T>): Action<T> | null {
    if (this.user.stats.hp.current <= 0) return null;
    if (!this.pp.use()) return null;

    const ret = new Action({
      battle: context.battle,
      user: this.user,
      effect: this.effects,
      source: this,
      targets: context.plan.targets,
    });

    ret.message(...[decide(config.locale.move.use, { context, move: this })].flat());
    return ret;
  }

  public tryCriticalHit(): boolean {
    if (this.effects.category === "Status") return false;
    const crit = Math.random();
    const stage = this.effects.criticalHitStage ?? 0;
    // TODO friendship, affection
    if (stage >= 3) return true;
    if (stage == 2) return crit < 1 / 2;
    if (stage == 1) return crit < 1 / 8;
    return crit < 1 / 24;
  }

  public getCriticalMultiplier(): number {
    return this.tryCriticalHit() ? config.moves.criticalMultiplier : 1;
  }
  public toString() {
    return `${this.effects.name} - ${this.effects.type.name}/${this.effects.category} - ${this.pp.current}/${this.pp.max} (${this.pp.boosts})`;
  }
}

interface MoveSearch {
  move?: Move;
  type?: Type;

  invert?: boolean;
}

// deno-lint-ignore ban-types
export type MoveEvents = {};
export class MoveSet extends EventEmitter<MoveEvents> {
  private _entries: MoveEntry[];
  public get entries() {
    return [...this._entries];
  }

  constructor(public readonly self: Codemon, initial?: Move[]) {
    super();
    if (initial) this._entries = initial.map(move => new MoveEntry({ user: self, move }));
    else {
      this._entries = [];
      // TODO autopopulate
    }
  }

  public add(move: Move) {
    if (this._entries.length >= config.moves.maxEntries) return false;
    if (this.find({ move }).length >= config.moves.maxDuplicateEntries) return false;

    const entry = new MoveEntry({ move, user: this.self });
    this._entries.push(entry);
  }

  public get(move: number): MoveEntry | null;
  public get(move: Move, duplicateIndex?: number): MoveEntry | null;
  public get(move: number | Move, duplicateIndex = 0): MoveEntry | null {
    if (typeof move === "number") return this._entries[move];

    const results = this.find({ move });
    if (results.length === 0) return null;
    return results[duplicateIndex % results.length];
  }

  public remove(move: number | MoveEntry): boolean;
  public remove(move: Move, duplicateIndex?: number): boolean;
  public remove(move: number | Move | MoveEntry, duplicateIndex = 0) {
    const entry =
      move instanceof MoveEntry ? move : typeof move === "number" ? this.get(move) : this.get(move, duplicateIndex);
    if (!entry) return false;
    const index = this._entries.indexOf(entry); // ugh, searching for it twice
    if (index < 0) return false;
    this._entries.splice(index, 1);
    return true;
  }

  public knows(move: Move) {
    return this.find({ move }).length > 0;
  }

  public find(moveSearch: MoveSearch) {
    return this._entries.filter(e => {
      if (moveSearch.move && e.effects !== moveSearch.move) return !!moveSearch.invert;
      if (moveSearch.type && e.effects.type !== moveSearch.type) return !!moveSearch.invert;
      return !moveSearch.invert;
    });
  }
}

// Utility deciders for moves
export function multiHit<P extends BattleBuilderParams<P>>(
  min: number,
  max: number
): Decider<boolean, TargetContext<T>> {
  const totalHits = decide(range(min, max), undefined);
  let hitsSoFar = 0;
  return () => hitsSoFar++ < totalHits;
}
