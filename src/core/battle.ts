import { EventEmitter } from "./external.ts";
import decide, { Decider } from "./decision.ts";
import { Codemon, DamageCategory, MoveEntry, Type } from "./index.ts";

import { TargetingCategory } from "./move.ts";
import { StageMods } from "./stats.ts";
import { Immutable } from "./util.ts";

// type EventHandler<E extends Record<string, unknown[]>> = {
//   [K in keyof E]?: (...event: E[K]) => void;
// };

export type StatusEffectEvents = {
  beforeApply: [entry: StatusEffectEntry, target: EffectTarget, source: Action, battle: Battle];
  // TODO ...
};

export interface StatusEffect {
  name: string;
  description: string;
  apply: (target: EffectTarget, source: Action, battle: Battle) => void | (() => void);
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
}

type SingleOrArray<T> = T | T[];

// TODO this belongs in ../battles/traditional.ts but
// that would lead to type parameters everywhere again
export interface Effects {
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
}

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
  typeBoost: number;
  total: number;
}>;

export type EffectDeciderContext = Immutable<{
  action: Action;
  target: EffectTarget;
  battle: Battle;
}>;

export type EffectParams = {
  [effect in keyof Effects]: Decider<Effects[effect], EffectDeciderContext>;
} & {
  accuracy?: number;
  recoil?: EffectParams;
  crash?: EffectParams;
};

export function decideEffects(action: Action, target: EffectTarget, battle: Battle) {
  const effects = action.effect;
  const context = { action, target, battle };
  if (Math.random() > (effects.accuracy ?? 1.1)) return {};
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
    target: EffectTarget;
    messages: BattleMessage[];
    attack?: AttackReciept;
  } & {
    [effect in Exclude<keyof Effects, "attack">]?: Effects[effect];
  }
>;

export interface EffectContext {
  effect: Effects;
  action: Action;
  battle: Battle;
}

export interface EffectTarget {
  recieveEffect(context: EffectContext): EffectReciept | Promise<EffectReciept>;
}

// this is only a class so i can initialize the arrays here instead of everywhere else
// there may be a better way
export class Action {
  public source: ActionSource; // Note to self, Subject,
  public effect: EffectParams; // Verb
  public targets: EffectTarget[]; // Object,
  public preactions: ReadyAction[] = [];
  public reactions: ReadyAction[] = [];
  public messages: BattleMessage[] = [];

  constructor(args: { source: ActionSource; targets: EffectTarget[]; effect: EffectParams }) {
    this.source = args.source;
    this.targets = args.targets;
    this.effect = args.effect;
  }
}

export interface ActionUseContext {
  battle: Battle;
  targets: EffectTarget[];
}

export interface ActionSource {
  priority?: number;
  targetingCategory: TargetingCategory;
  useAction: (context: ActionUseContext) => Action;
}

export interface ReadyAction {
  source: ActionSource;
  targets: EffectTarget[];
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
  reciepts: ActionReciept[]; // running list of past actions this round
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
  start: [combatants: BattleActor[]];
  /** The start of a round, before actions have been chosen */
  round: [round: Round];
  /** An actor has decided on an action */
  readyAction: [action: ReadyAction];
  /** All actors have decided on an action */
  ready: [actions: ReadyAction[]];
  /** An action is about to be executed */
  beforeAction: [action: ReadyAction];
  /** An action has been executed, but its effects haven't been sent to the targets yet */
  action: [action: Action];
  /** An effect is about to be sent to a target */
  effect: [effect: Effects, target: EffectTarget, action: Action];
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
  targets: EffectTarget[];
  count: "All" | number;
  random?: boolean;
}
export interface BattleController {
  action: (combatant: BattleActor, battle: Battle) => Promise<ActionSource> | ActionSource;
  target: (combatant: BattleActor, ready: ActionSource, choice: TargetChoice) => EffectTarget[];
  apply?: (battle: Battle) => void; // for player interfaces
}

export interface BattleActor {
  self: Codemon; // TODO more, like substitute
  controller: BattleController;
}

export abstract class Battle extends EventEmitter<BattleEvents> {
  // TODO history searching for things like move restrictions

  abstract runBattle(): Promise<BattleReciept>;
  abstract runRound(): Promise<RoundReciept>;
  abstract runAction(action: ReadyAction): Promise<ActionReciept>;
  abstract sortActions(actions: ReadyAction[]): ReadyAction[];
  abstract getCurrentRound(): Round;
  abstract getAction(combatant: BattleActor): ReadyAction | Promise<ReadyAction>;
  abstract getActions(): Promise<ReadyAction[]>;
  abstract getTargets(source: ActionSource): TargetChoice | Promise<TargetChoice>;
}

export interface BattleReciept {
  readonly rounds: RoundReciept[];
  readonly remaining: BattleActor[];
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

export function recoil(target: EffectTarget, effect: EffectParams): ReadyAction {
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
    source: recoil,
    targets: [target],
  };
}

export function crash(target: EffectTarget, effect: EffectParams): ReadyAction {
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

    return {
      level,
      power,
      stat,
      type,
      category,
      // TODO critical, item, stab, weather, multitarget, random, other
    };
  };
}
