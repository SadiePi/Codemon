// deno-lint-ignore no-unused-vars
import Input from "https://deno.land/x/input@2.0.3/index.ts";
import { EventEmitter } from "https://raw.githubusercontent.com/SadiePi/event-with-wait/master/mod.ts";
import { Ability } from "./ability.ts";

import Codemon from "./codemon.ts";
import { Item } from "./item.ts";
import { Move } from "./move.ts";
import { StageMods } from "./stats.ts";

export interface StatusEffect {
  name: string;
  description: string;
  volatile: boolean;
  apply: (target: Codemon, action: Action, battle: Battle) => void;
  // TODO shouldUnapply: (target: Codemon, action: Action battle: Battle) => boolean;
  unapply: (target: Codemon, action: Action, battle: Battle) => void;
}

export interface Weather {
  name: string;
  description: string;
  apply: (action: Action, battle: Battle) => void;
  // TODO shouldUnapply: (target: Codemon<B>, source: Codemon<B>, battle: B) => boolean;
  unapply: (action: Action, battle: Battle) => void;
}

export type ActionSource = {
  priority?: number;
  use: (targets: Codemon[], battle: Battle) => Action;
} & (
  | { type: "Item"; item: Item }
  | { type: "Ability"; ability: Ability }
  | { type: "Move"; move: Move }
  | { type: "Status"; statusEffect: StatusEffect }
  | { type: "Weather"; weather: Weather }
  | { type: "Meta"; meta: "Flee" | "Switch" | "Run" | "End" }
  | { type: "Other"; meta?: unknown }
);

export interface ReadyAction {
  source: ActionSource;
  targets: Codemon[];
}

type ActionEffects = {
  attack: {
    base: number;
    multitarget: number;
    weather: number;
    random: number;
    critical: number;
    stab: number;
    other: number;
  } | null;

  hp: number | null; // raw hp change
  stage: StageMods | null;
  swap: Codemon | null;
  flee: boolean;
  statuses: StatusEffect[];
  weather: Weather | null;
  recoil: ActionSource | null;
  crash: ActionSource | null;
  messages: string[];
};

export class Action implements ReadyAction, ActionEffects {
  constructor(public source: ActionSource, public targets: Codemon[], effects?: Partial<ActionEffects>) {
    Object.assign(this, effects);
  }
  public successful = true;
  public attack: ActionEffects["attack"] = null;
  public hp: ActionEffects["hp"] = null;
  public stage: ActionEffects["stage"] = null;
  public swap: ActionEffects["swap"] = null;
  public flee: ActionEffects["flee"] = false;
  public weather: ActionEffects["weather"] = null;
  public recoil: ActionEffects["recoil"] = null;
  public crash: ActionEffects["crash"] = null;
  public statuses: ActionEffects["statuses"] = [];
  public messages: ActionEffects["messages"] = [];
  public preactions: ReadyAction[] = [];
  public reactions: ReadyAction[] = [];
}

export interface ActionReciept {
  action: Action;
  target: Codemon;
  successful?: boolean;
  attack?: {
    typeBoost: number;
    total: number;
  };
  hp?: number;
  fainted?: boolean;
  stage?: StageMods;
  swap?: Codemon;
  flee?: boolean;
  statuses?: StatusEffect[];
  weather?: Weather;
  messages?: string[];
}

export interface ActionReport {
  source: ActionSource;
  targets: Codemon[];
  action: Action;
  reciepts: ActionReciept[];
  messages: string[];
}

export interface RoundReciept {
  round: number;
  reports: ActionReport[];
  messages: string[];
  reactions: ReadyAction[];
}

export interface RoundReport {
  round: number;
  reports: ActionReport[];
  messages: string[];
}

export type Controller = (codemon: Codemon, battle: Battle) => Promise<ReadyAction> | ReadyAction;

export abstract class Battle extends EventEmitter<{
  start: [combatants: Codemon[]];
  round: [combatants: Codemon[], round: number];
  ready: [actions: ReadyAction[]];
  beforeAction: [source: ReadyAction];
  action: [action: Action];
  beforeActionReciept: [action: Action, target: Codemon];
  actionReciept: [reciept: ActionReciept];
  actionReport: [report: ActionReport];
  roundEnd: [reciept: RoundReciept];
  afterRound: [report: RoundReport];
  afterEnd: [result: unknown];
}> {
  private _round = 0;
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

  private playerController: Controller = this.getAIAction;
  public setPlayerController(i: Controller) {
    this.playerController = i;
  }
  public async getPlayerAction(codemon: Codemon): Promise<ReadyAction> {
    return await this.playerController(codemon, this);
  }

  abstract runBattle(): Promise<{ winner: Codemon }>;
  abstract runRound(): Promise<void>;
  abstract getTargets(source: ActionSource): Codemon[];
  abstract getActions(): Promise<ReadyAction[]>;
  abstract getAIAction(codemon: Codemon): ReadyAction;
  abstract sortActions(actions: ReadyAction[]): ReadyAction[];
  abstract applyAction(action: ReadyAction): Promise<ActionReport[]>;
}
