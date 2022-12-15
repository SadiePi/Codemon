import { EventEmitter } from "https://raw.githubusercontent.com/SadiePi/event-with-wait/master/mod.ts";
import { Codemon, DamageCategory, Type } from "./index.ts";

import { TargetingCategory } from "./move.ts";
import { StageMods } from "./stats.ts";

export interface StatusEffect {
  name: string;
  description: string;
  volatile: boolean;
  apply: (target: ActionTarget, source: Action, battle: Battle) => void | (() => void);
  // TODO shouldUnapply: (target: Codemon, action: Action battle: Battle) => boolean;
}

export interface Weather {
  name: string;
  description: string;
  apply: (source: Action, battle: Battle) => void | (() => void);
}

export interface Ability {
  name: string;
  description: string;
  apply: (target: ActionTarget, source: Action, battle: Battle) => void | (() => void);
}

export interface ActionSource {
  priority?: number;
  targetingCategory: TargetingCategory;
  useAction: (targets: ActionTarget[], battle: Battle) => Action;
}

export interface ActionTarget {
  recieveAction(effects: ActionEffects, action: ReadyAction, battle: Battle): EffectReciept | Promise<EffectReciept>;
}

export interface TargetChoice {
  source: ActionSource;
  targets: ActionTarget[];
  choice: "All" | "Single" | "RandomAll" | "RandomSingle";
}

export interface ReadyAction {
  source: ActionSource;
  targets: ActionTarget[];
}

export interface Attack {
  level: number;
  power: number;
  stat: number;
  category: Exclude<DamageCategory, "Status">;
  type: Type;
  critical?: number;
  item?: number;
  stab?: number;
  weather?: number;
  multitarget?: number;
  random?: number;
  other?: number;
}

// TODO NEXT separate action effects from action params

export interface ActionEffects {
  /** Initial probability of overall success */
  accuracy?: number;
  /** Attack power */
  power?: number;
  /** Specific attack values */
  attack?: Attack;
  /** Add status effects */
  status?: StatusEffect | StatusEffect[];
  /** Change weather */
  weather?: Weather;
  /** Recover a multiple of damage dealt */
  leech?: number;
  /** Raw HP change */
  hp?: number;
  /** Instant faint */
  faint?: boolean;
  /** Stat stage changes */
  stage?: StageMods;
  /** Chance of removing from battle without fainting */
  eject?: boolean;
  /** Restrict move usage */
  restrict?: unknown; // restirct move usage
  /** Apply an effect to the user on hit */
  recoil?: EffectParams; // affect the user on hit
  /** Apply an effect to the user on miss */
  crash?: EffectParams;
  /** Apply an action before this one */
  preactions?: ReadyAction | ReadyAction[];
  /** Apply an action after this one */
  reactions?: EffectDecider<ReadyAction | ReadyAction[]>;
}

type EffectDecider<T> = T | [T, number] | ((action: ReadyAction, target: ActionTarget, battle: Battle) => T);
type EffectParams = {
  [effect in keyof ActionEffects]: EffectDecider<ActionEffects[effect]>;
};
export type EffectSource = {
  /** Name of the effect */
  name: string;
  /** More details */
  description: string;
  /** Targeting cateory */
  target: TargetingCategory;
} & EffectParams;

function effectFromParam<T>(
  param: EffectDecider<T>,
  action: ReadyAction,
  target: ActionTarget,
  battle: Battle
): T | undefined {
  if (Array.isArray(param)) return Math.random() < param[1] ? param[0] : undefined;
  if (param instanceof Function) return param(action, target, battle);
  return param;
}

export function effectsFromParams<T>(
  params: EffectParams,
  action: ReadyAction,
  target: ActionTarget,
  battle: Battle
): ActionEffects {
  const ret = {} as ActionEffects;

  // TODO figure out why typescript doesn't like doing this in a loop
  // for now, adding new effects requires adding them here

  const accuracy = effectFromParam(params.accuracy, action, target, battle);
  if (accuracy !== undefined) ret.accuracy = accuracy;

  const power = effectFromParam(params.power, action, target, battle);
  if (power !== undefined) ret.power = power;

  const attack = effectFromParam(params.attack, action, target, battle);
  if (attack !== undefined) ret.attack = attack;

  const status = effectFromParam(params.status, action, target, battle);
  if (status !== undefined) ret.status = status;

  const weather = effectFromParam(params.weather, action, target, battle);
  if (weather !== undefined) ret.weather = weather;

  const leech = effectFromParam(params.leech, action, target, battle);
  if (leech !== undefined) ret.leech = leech;

  const hp = effectFromParam(params.hp, action, target, battle);
  if (hp !== undefined) ret.hp = hp;

  const faint = effectFromParam(params.faint, action, target, battle);
  if (faint !== undefined) ret.faint = faint;

  const stage = effectFromParam(params.stage, action, target, battle);
  if (stage !== undefined) ret.stage = stage;

  const eject = effectFromParam(params.eject, action, target, battle);
  if (eject !== undefined) ret.eject = eject;

  const restrict = effectFromParam(params.restrict, action, target, battle);
  if (restrict !== undefined) ret.restrict = restrict;

  const recoil = effectFromParam(params.recoil, action, target, battle);
  if (recoil !== undefined) ret.recoil = recoil;

  const crash = effectFromParam(params.crash, action, target, battle);
  if (crash !== undefined) ret.crash = crash;

  const preactions = effectFromParam(params.preactions, action, target, battle);
  if (preactions !== undefined) ret.preactions = preactions;

  const reactions = effectFromParam(params.reactions, action, target, battle);
  if (reactions !== undefined) ret.reactions = reactions;

  return ret;
}

export class Action implements ReadyAction {
  constructor(
    public params: EffectParams,
    public source: ActionSource,
    public targets: ActionTarget[],
    public battle: Battle
  ) {}
  public preactions: ReadyAction[] = [];
  public reactions: ReadyAction[] = [];
  public messages: string[] = [];
}

export interface EffectReciept {
  target: ActionTarget;
  failed?: boolean;
  attack?: {
    typeBoost: number;
    total: number;
  };
  hp?: number;
  fainted?: boolean;
  stage?: StageMods;
  swap?: ActionTarget;
  flee?: boolean;
  statuses?: StatusEffect[];
  weather?: Weather;
  messages?: string[];
}

export interface ActionReciept {
  preactions?: ActionReciept[];
  action: Action;
  effects: EffectReciept[];
  messages?: string[];
  reactions?: ActionReciept[];
}

export interface PreliminaryRoundReciept {
  round: number;
  actions: ActionReciept[];
  messages: string[];
  reactions: ReadyAction[];
}

export interface RoundReciept {
  round: number;
  actions: ActionReciept[];
  messages: string[];
}

export interface BattleReciept {
  rounds: RoundReciept[];
  winner: ActionTarget;
  messages: string[];
}

export type BattleController = (combatant: Combatant, battle: Battle) => Promise<ReadyAction> | ReadyAction;

type BattleEvents = {
  start: [combatants: ActionTarget[]];
  round: [combatants: ActionTarget[], round: number];
  ready: [actions: ReadyAction[]];
  beforeAction: [source: ReadyAction];
  action: [action: Action];
  beforeEffectReciept: [effect: ActionEffects, target: ActionTarget, action: Action];
  effectReciept: [reciept: EffectReciept];
  actionReciept: [reciept: ActionReciept];
  roundEnd: [reciept: PreliminaryRoundReciept];
  afterRound: [report: RoundReciept];
  afterEnd: [report: BattleReciept];
};

export type Combatant = Codemon; // TODO: add other combatants
export abstract class Battle extends EventEmitter<BattleEvents> {
  protected _round = 0;
  public get round(): number {
    return this._round;
  }

  // private _history: HistoryItem[] = [];
  // public getHistory(filter?: { actor?: Action["pre"]["actor"]; round?: number; type?: Action["pre"]["type"] }) {
  //   if (!filter) return this._history.at(-1);
  //   for (const hi of this._history) {
  //     if (filter.actor && filter.actor !== hi.pre.actor && filter.actor !== hi.post?.actor) continue;
  //     if (filter.round && filter.round !== hi.round) continue;
  //     if (filter.type && filter.type !== hi.pre.type && hi.post?.type) continue;
  //     return hi;
  //   }
  // }
  // protected pushHistory(...actions: { pre: Action["pre"]; post?: Action["post"] }[]) {
  //   this._history.push(...actions.map<HistoryItem<Action>>(a => ({ round: this.round, pre: a.pre, post: a.post })));
  // }

  private playerController: BattleController = this.getAIAction;
  public setPlayerController(i: BattleController) {
    this.playerController = i;
  }
  public async getPlayerAction(combatant: Combatant): Promise<ReadyAction> {
    return await this.playerController(combatant, this);
  }

  abstract runBattle(): Promise<BattleReciept>;
  abstract runRound(): Promise<RoundReciept>;
  abstract getActions(): Promise<ReadyAction[]>;
  abstract getTargets(source: ActionSource): TargetChoice;
  abstract getAITarget(combatant: Combatant, choice: TargetChoice): ActionTarget[];
  abstract getAIAction(combatant: Combatant): ReadyAction;
  abstract sortActions(actions: ReadyAction[]): ReadyAction[];
  abstract runAction(action: ReadyAction): Promise<ActionReciept>;
}
