// TODO change this to Competition and change TraditionalBattle to Battle

import { EventEmitter } from "./external.ts";
import {
  config,
  DamageCategory,
  decide,
  Decider,
  MoveEntry,
  MultiDecider,
  StageMods,
  TargetingCategory,
  Trainer,
  Type,
} from "./mod.ts";
import { Immutable } from "./util.ts";

// type EventHandler<E extends Record<string, unknown[]>> = {
//   [K in keyof E]?: (...event: E[K]) => void;
// };

export type StatusEffectEvents = {
  beforeApply: [entry: StatusEffectEntry, target: Combatant, source: Action, battle: Battle];
  // TODO ...
};

export interface StatusEffect {
  name: string;
  description: string;
  apply: (target: Combatant, source: Action, battle: Battle) => void | (() => void);
  // TODO apply to map

  // below are common properties of status effects that could very well
  // be implemented in the apply function, but it's nice to have the
  // option to have the engine handle them for you
  volatile?: boolean; // remove on exit from battle
  duration?: number; // remove after this many turns
  // TODO volatile and duration should be mutually exclusive
}

export class StatusEffectEntry extends EventEmitter<StatusEffectEvents> {
  constructor(public readonly effect: StatusEffect) {
    super();
  }
}

export interface Weather {
  name: string;
  description: string;
  apply: (source: Action, battle: Battle) => void | (() => void);
  // TODO apply to map

  // below are common properties of weather effects that could very well
  // be implemented in the apply function, but it's nice to have the
  // option to have the engine handle them for you
  duration?: Decider<number, Battle>; // remove after this many turns
  statStages?: Decider<StageMods, { source: Action; battle: Battle }>;
}

type SingleOrArray<T> = T | T[];

// TODO this belongs in ../battles/traditional.ts but
// that would lead to type parameters everywhere again
export type Effects = {
  /** Normal attack on the target */
  attack?: Attack;
  /** Apply status effects */
  status?: SingleOrArray<StatusEffect>;
  /** Change weather */
  weather?: Weather;
  /** Recover proportion (out of 1) of damage dealt */
  leech?: number;
  /** Raw HP change */
  hp?: number;
  /** Stat stage changes */
  stages?: StageMods;
  /** Remove from battle without fainting */
  eject?: boolean;
  /** End the battle immediately */
  end?: boolean;
  /** Instant faint */
  faint?: boolean;
};

export interface Attack {
  /** The level of the user */
  level: number;
  /** The power of the move */
  power: number;
  /** The relavent attack stat of the user */
  stat: number;
  /** The category of the move */
  category: Exclude<DamageCategory, "Status">;
  /** The type of the move */
  type: Type;
  /** Factor from critical hit */
  critical?: number;
  /** Factor from held item */
  item?: number;
  /** Factor from Same Type Attack Boost */
  stab?: number;
  /** Factor from influence of weather */
  weather?: number;
  /** Factor from multiple targets */
  multitarget?: number;
  /** Factor from Math.random() */
  random?: number;
  /** Factor from ✨Special✨ */
  other?: number;
}

export type AttackReciept = Immutable<{
  attack: Attack;
  typeMultiplier: number;
  total: number;
}>;

export type EffectDeciderContext = Immutable<{
  action: Action;
  target: Combatant;
  battle: Battle;
}>;

export type EffectParams = MultiDecider<Effects, EffectDeciderContext> & {
  accuracy?: number;
  recoil?: EffectParams;
  crash?: EffectParams;
};

export function decideEffects(action: Action, target: Combatant, battle: Battle) {
  const effects = action.effect;
  const context = { action, target, battle };
  if (effects.accuracy && Math.random() > effects.accuracy) return {};
  const ret: Effects = {};
  const attack = decide(effects.attack, context);
  if (attack) ret.attack = attack;
  const status = decide(effects.status, context);
  if (status) ret.status = status;
  const weather = decide(effects.weather, context);
  if (weather) ret.weather = weather;
  const leech = decide(effects.leech, context);
  if (leech) ret.leech = leech;
  const hp = decide(effects.hp, context);
  if (hp) ret.hp = hp;
  const faint = decide(effects.faint, context);
  if (faint) ret.faint = faint;
  const stages = decide(effects.stages, context);
  if (stages) ret.stages = stages;
  const eject = decide(effects.eject, context);
  if (eject) ret.eject = eject;
  return ret;
}

export type EffectSource = EffectParams & {
  name: string;
  description: string;
  target: TargetingCategory;
};

export type EffectReciept = Immutable<
  {
    target: Combatant;
    messages: BattleMessage[];
    attack?: AttackReciept;
  } & {
    [effect in Exclude<keyof Effects, "attack">]?: Effects[effect];
  }
>;

// this is only a class so i can initialize the arrays here instead of everywhere else
// there may be a better way
export class Action {
  public source: ActionSource; // Note to self, Subject,
  public effect: EffectParams; // Verb
  public targets: Combatant[]; // Object,
  public actionReciepts: ActionReciept[] = []; // running list of past actions for this action
  public effectReciepts: EffectReciept[] = []; // running list of effects for this action
  public preactions: ReadyAction[] = [];
  public reactions: ReadyAction[] = [];
  public messages: BattleMessage[] = [];

  constructor(args: { source: ActionSource; targets: Combatant[]; effect: EffectParams }) {
    this.source = args.source;
    this.targets = args.targets;
    this.effect = args.effect;
  }
}

export interface ActionUseContext {
  battle: Battle;
  targets: Combatant[];
}

export interface ActionSource {
  priority?: number;
  targetingCategory: TargetingCategory;
  useAction: (context: ActionUseContext) => Action;
}

export interface ReadyAction {
  combatant: Combatant;
  source: ActionSource;
  targets: Combatant[];
}

export interface ActionReciept {
  readonly source: ActionSource;
  readonly preactions: ActionReciept[];
  readonly effects: EffectReciept[];
  readonly reactions: ActionReciept[];
  readonly messages: BattleMessage[];
}

// this round system is still pretty rough
// TODO make this better

export interface Round {
  readonly number: number;
  preactions: ReadyAction[];
  actions: ActionReciept[]; // running list of past actions this round
  messages: BattleMessage[];
  reactions: ReadyAction[];
}

export interface RoundReciept {
  readonly number: number;
  readonly preactions: ActionReciept[];
  readonly actions: ActionReciept[];
  readonly reactions: ActionReciept[];
  readonly messages: BattleMessage[];
}

export type BattleMessage = string; // TODO include animation info etc

type BattleEvents = {
  /** The start of the battle, before anything has happened */
  start: [combatants: Combatant[]];
  /** The start of a round, before actions have been chosen */
  round: [round: Round];
  /** An actor has decided on an action */
  ready: [action: ReadyAction];
  /** All actors have decided on an action */
  allReady: [actions: ReadyAction[]];
  /** An action is about to be executed */
  beforeAction: [action: ReadyAction];
  /** An action has been executed, but its effects haven't been sent to the targets yet */
  action: [action: Action];
  /** An effect is about to be sent to a target */
  effect: [effect: Effects, target: Combatant, action: Action];
  /** An effect has been sent to a target */
  effectReciept: [reciept: EffectReciept];
  /** The end of an action, before reactions are run */
  actionEnd: [action: Action];
  /** An action has been executed, and its effects have been sent to the targets */
  actionReciept: [reciept: ActionReciept];
  /** The end of a round, after all actions are done, before reactions are run */
  roundEnd: [reciept: Round];
  /** The end of a round, after all actions and reactions are done */
  roundReciept: [report: RoundReciept];
  /** The end of the battle, after all rounds are done */
  battleReciept: [report: BattleReciept];
};

export interface TargetChoice {
  targets: Combatant[];
  count: "All" | number;
  random?: boolean;
}

export type EffectContext = Immutable<{
  effect: Effects;
  action: Action;
  battle: Battle;
}>;

// Codemon, substitute, unidentified ghost, etc
export interface Combatant {
  trainer: Trainer;
  recieveEffect: (context: EffectContext) => EffectReciept;
  getAction: (battle: Battle) => ReadyAction | Promise<ReadyAction>;
}

export abstract class Battle extends EventEmitter<BattleEvents> {
  constructor(public combatants: Combatant[]) {
    super();
  }
  // TODO history searching for things like move restrictions

  abstract runBattle(): Promise<BattleReciept>;
  abstract getRound(): Round;
  abstract runRound(): Promise<RoundReciept>;
  abstract getActions(): Promise<ReadyAction[]>;
  abstract getAction(combatant: Combatant): ReadyAction | Promise<ReadyAction>;
  abstract getTargets(action: ActionSource, combatant: Combatant): TargetChoice;
  abstract sortActions(actions: ReadyAction[]): ReadyAction[];
  abstract runActions(actions: ReadyAction[]): Promise<ActionReciept[]>;
  abstract runAction(action: ReadyAction): Promise<ActionReciept | undefined>;
}

export interface BattleReciept {
  readonly rounds: RoundReciept[];
  readonly remaining: Combatant[];
  readonly messages: BattleMessage[];
}

export function flattenActionMessages(action: ActionReciept, into: BattleMessage[] = []) {
  for (const preaction of action.preactions) flattenActionMessages(preaction, into);
  into.push(...action.messages);
  for (const effect of action.effects) into.push(...effect.messages);
  for (const reaction of action.reactions) flattenActionMessages(reaction, into);
  return into;
}

export function flattenRoundMessages(round: RoundReciept, into: BattleMessage[] = []) {
  for (const action of round.actions) flattenActionMessages(action, into);
  into.push(...round.messages);
  for (const reaction of round.reactions) flattenActionMessages(reaction, into);
  return into;
}

export function flattenBattleMessages(battle: BattleReciept, into: BattleMessage[] = []) {
  for (const round of battle.rounds) flattenRoundMessages(round, into);
  into.push(...battle.messages);
  return into;
}

export function recoil(target: Combatant, effect: EffectParams): ReadyAction {
  const recoil: ActionSource = {
    priority: 0,
    targetingCategory: "Self",
    useAction: () =>
      new Action({
        source: recoil,
        targets: [target],
        effect,
      }),
  };
  return {
    combatant: target,
    source: recoil,
    targets: [target],
  };
}

export function crash(target: Combatant, effect: EffectParams): ReadyAction {
  const crash: ActionSource = {
    priority: 0,
    targetingCategory: "Self",
    useAction: () =>
      new Action({
        source: crash,
        targets: [target],
        effect,
      }),
  };
  return {
    combatant: target,
    source: crash,
    targets: [target],
  };
}

// Battle utility functions

/** A completely normal attack */
export function power(power: number): Decider<Attack, EffectDeciderContext> {
  return ({ action }) => {
    if (!(action.source instanceof MoveEntry)) throw new Error("power() can only be used with moves");
    const level = action.source.user.stats.level;
    const type = action.source.effects.type;
    const category = action.source.effects.category;
    if (category === "Status") throw new Error("Status moves cannot be used as attacks");
    const stats = action.source.user.stats;
    const stat = stats[category === "Physical" ? "attack" : "specialAttack"].value(true);
    const critical = action.source.TryCriticalHit() ? action.source.GetCriticalMultiplier() : 1;
    const random =
      Math.random() * (config.moves.maxRandomMultiplier - config.moves.minRandomMultiplier) +
      config.moves.minRandomMultiplier;
    const stab = action.source.user.species.types.includes(type) ? config.moves.stabMultiplier : 1;
    const multitarget = action.targets.length > 1 ? config.moves.multitargetMultiplier : 1;

    console.log(`random is ${random}`);
    return {
      level,
      power,
      stat,
      type,
      category,
      critical,
      stab,
      multitarget,
      weather: 1, // TODO
      random,
      other: 1,
    };
  };
}
