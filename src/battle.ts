// TODO change this to Competition and change TraditionalBattle to Battle

import { Type } from "./codemon.ts";
import { config } from "./config.ts";
import { decide, Decider } from "./decision.ts";
import { EventEmitter } from "./external.ts";
import { DamageCategory, TargetingCategory, MoveEntry } from "./move.ts";
import { StageMods } from "./stats.ts";
import { StatusEffect, Weather } from "./status.ts";
import { SingleOrArray } from "./util.ts";

// type EventHandler<E extends Record<string, unknown[]>> = {
//   [K in keyof E]?: (...event: E[K]) => void;
// };

type EffectType<Effect, Context, Extra = Record<never, never>> = {
  effect: Decider<Effect | undefined, Context>;
  reciept: EffectTypeReciept<Effect, Extra>;
};

type BaseEffectReciept<E> =
  | {
      success: true;
      messages: BattleMessage[];
      actual: E;
    }
  | {
      success: false;
      messages: BattleMessage[];
    };

type EffectTypeReciept<E, Extra = Record<never, never>> = BaseEffectReciept<E> & Extra;

type EffectGroup = Record<string, EffectType<unknown, TargetContext | SourceContext | BattleContext, unknown>>;
type EffectGroupReciept<G extends EffectGroup> = {
  [K in keyof G]: G[K]["reciept"];
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

export interface BaseAttackReciept {
  typeMultiplier: number;
  total: number;
  faint: boolean;
}

export type AttackReciept = EffectTypeReciept<Attack, BaseAttackReciept>;

export interface HPReciept {
  faint: boolean;
}

export type TargetContext = {
  user: Combatant;
  target: Combatant;
  action: Action;
};
export type TargetEffect<E, Extra = Record<never, never>> = EffectType<E, TargetContext, Extra>;

export type SourceContext = {
  combatant: Combatant;
  action: Action;
};
export type SourceEffect<E, Extra = Record<never, never>> = EffectType<E, SourceContext, Extra>;

export type BattleContext = {
  combatant: Combatant;
  action: Action;
  battle: Battle;
};
export type BattleEffect<E, Extra = Record<never, never>> = EffectType<E, BattleContext, Extra>;

// for a combatant to recieve directly
export type TargetEffects = {
  attack: TargetEffect<Attack, BaseAttackReciept>;
  status: TargetEffect<SingleOrArray<StatusEffect>>;
  hp: TargetEffect<number, HPReciept>;
  stages: TargetEffect<StageMods>;
  faint: TargetEffect<boolean>;
};

export type TargetEffectsReciept = Partial<EffectGroupReciept<TargetEffects>>;

// for a combatant to recieve indirectly, handled by the battle
export type SourceEffects = {
  leech: SourceEffect<number>;
  recoil: SourceEffect<EffectParams<TargetEffects>>;
  crash: SourceEffect<EffectParams<TargetEffects>>;
};

export type SourceEffectsReciept = Partial<EffectGroupReciept<SourceEffects>>;

// for the battle itself to recieve
export type BattleEffects = {
  weather: BattleEffect<Weather>;
  eject: BattleEffect<SingleOrArray<Combatant>>;
  end: BattleEffect<boolean>;
};

export type BattleEffectsReciept = Partial<EffectGroupReciept<BattleEffects>>;

export type EffectReciever<E extends EffectGroup> = {
  [K in keyof E as K extends string ? `receive${Capitalize<K>}` : never]-?: (
    effect: E[K]["effect"],
    action: Action
  ) => E[K]["reciept"];
} & {
  receiveEffects: (effects: Partial<Effects<E>>, action: Action) => Partial<EffectGroupReciept<E>> | null;
};

type target = EffectReciever<TargetEffects>;
type source = EffectReciever<SourceEffects>;
type battle = EffectReciever<BattleEffects>;

type EffectTypes = TargetEffects & SourceEffects & BattleEffects;
export type EffectReciept = EffectGroupReciept<EffectTypes>;

export type EffectParams<G extends EffectGroup = EffectTypes> = {
  [K in keyof G]?: G[K]["effect"];
} & {
  accuracy?: Decider<number | boolean, TargetContext>; // boolean means never or always hit
};

export type Effects<G extends EffectGroup = EffectTypes> = {
  [K in keyof G]?: G[K]["effect"];
};

export function decideTargetEffects(
  params: EffectParams<TargetEffects>,
  context: TargetContext
): Partial<Effects<TargetEffects> & { accuracy: number | boolean }> {
  const effects = {} as Partial<Effects<TargetEffects> & { accuracy: number | boolean }>;

  effects.accuracy = decide(params.accuracy, context);
  if (effects.accuracy === false) return effects;

  const attack = decide(params.attack, context);
  if (attack) effects.attack = attack;
  const status = decide(params.status, context);
  if (status) effects.status = status;
  const hp = decide(params.hp, context);
  if (hp) effects.hp = hp;
  const stages = decide(params.stages, context);
  if (stages) effects.stages = stages;
  const faint = decide(params.faint, context);
  if (faint) effects.faint = faint;

  return effects;
}

export function decideSourceEffects(
  params: EffectParams<SourceEffects>,
  context: SourceContext
): Partial<Effects<SourceEffects>> {
  const effects = {} as Partial<Effects<SourceEffects>>;

  const leech = decide(params.leech, context);
  if (leech) effects.leech = leech;
  const recoil = decide(params.recoil, context);
  if (recoil) effects.recoil = recoil;
  const crash = decide(params.crash, context);
  if (crash) effects.crash = crash;

  return effects;
}

export function decideBattleEffects(
  params: EffectParams<BattleEffects>,
  context: BattleContext
): Partial<Effects<BattleEffects>> {
  const effects = {} as Partial<Effects<BattleEffects>>;

  const weather = decide(params.weather, context);
  if (weather) effects.weather = weather;
  const end = decide(params.end, context);
  if (end) effects.end = end;

  return effects;
}

export type EffectSource = EffectParams & {
  name: string;
  description: string;
  target: TargetingCategory;
};

export interface ActionUseContext {
  battle: Battle;
  plan: ActionPlan;
}

export interface ActionSource {
  priority?: number;
  targetingCategory: TargetingCategory;
  useAction: (context: ActionUseContext) => Action | null; // null for failure
}

export interface ActionPlan {
  combatant: Combatant;
  source: ActionSource;
  targets: Combatant[];
}

export interface ActionParams {
  battle: Battle;
  user: Combatant;
  source: ActionSource;
  effect: EffectParams;
  targets: Combatant[];
  parent?: Action;
}

export class Action extends EventEmitter<{
  begin: [];
  preaction: [preaction: Action];
  preactionReciept: [reciept: ActionReciept];
  afterPreactions: [reciepts: ActionReciept[]];
  beforeReactions: [reciepts: ActionReciept[]];
  reaction: [reaction: Action];
  reactionReciept: [reciept: ActionReciept];
  subaction: [subaction: Action];
  subactionReciept: [reciept: ActionReciept];
  message: [message: BattleMessage];
  end: [reciept: ActionReciept];
}> {
  private _allowPreactions = true;
  private _preactions: ActionPlan[] = [];
  private _preactionReciepts: ActionReciept[] = [];
  public get allowPreactions() {
    return this._allowPreactions;
  }
  public addPreaction(action: ActionPlan) {
    if (!this.allowPreactions) throw new Error("Preactions are not allowed at this time");
    this._preactions.push(action);
  }

  private _allowReactions = true;
  private _reactions: ActionPlan[] = [];
  private _reactionReciepts: ActionReciept[] = [];
  public get allowReactions() {
    return this._allowReactions;
  }
  public addReaction(action: ActionPlan) {
    if (!this.allowReactions) throw new Error("Reactions are not allowed at this time");
    this._reactions.push(action);
  }

  private _currentSubaction: Action | null = null;
  public get currentSubaction() {
    return this._currentSubaction;
  }

  private _messages: BattleMessage[] = [];
  public message(message: BattleMessage) {
    this._messages.push(message);
  }

  public cancel = false;

  constructor(public params: ActionParams) {
    super();
  }

  private _reciept: ActionReciept | null = null;
  public get reciept() {
    return this._reciept;
  }

  public async execute(battle: Battle): Promise<ActionReciept> {
    if (this.reciept) throw new Error("Action has already been executed");
    const { targets, user } = this.params;
    await this.wait("begin");

    this._allowPreactions = false;
    const preactions: ActionReciept[] = [];
    for (const plan of this._preactions) {
      const action = plan.source.useAction({ plan, battle });
      if (!action) continue;

      this._currentSubaction = action;
      await this.wait("reaction", this._currentSubaction);
      await this.wait("subaction", this._currentSubaction);

      const reciept = await this._currentSubaction.execute(battle);
      this._currentSubaction = null;
      preactions.push(reciept);
    }
    await this.wait("afterPreactions", this._preactionReciepts);

    let [applyRecoil, applyCrash] = [false, false];

    const reciepts: Partial<EffectGroupReciept<TargetEffects>>[] = [];
    for (const target of targets) {
      const reciept = target.receiveEffects(this.params.effect, this);

      // TODO this should be in the effect reciever
      // let hit = true;
      // if (typeof effects.accuracy === "boolean") hit = effects.accuracy;
      // else {
      //   const effectAccuracy = effects.accuracy ?? 1;
      //   const sourceAccuracy = combatant instanceof Codemon ? combatant.stats.accuracy.stage.multiplier() : 1;
      //   const targetEvasion = target instanceof Codemon ? target.stats.evasion.stage.multiplier() : 1;
      //   const accuracy = (effectAccuracy * sourceAccuracy) / targetEvasion;
      //   if (Math.random() > accuracy) hit = false;
      // }

      if (reciept) applyRecoil = true;
      if (!reciept) applyCrash = true;

      if (reciept) reciepts.push(reciept);
    }

    const recoilEffect = decide(this.params.effect.recoil ?? undefined, { action: this, combatant: user });
    if (applyRecoil && recoilEffect) this.addReaction(recoil(user, recoilEffect));

    const crashEffect = decide(this.params.effect.crash ?? undefined, { action: this, combatant: user });
    if (applyCrash && crashEffect) this.addReaction(recoil(user, crashEffect));

    this._allowReactions = false;
    const reactions: ActionReciept[] = [];
    for (const plan of this._reactions) {
      const action = plan.source.useAction({ plan, battle });
      if (!action) continue;

      this._currentSubaction = action;
      await this.wait("reaction", this._currentSubaction);
      await this.wait("subaction", this._currentSubaction);

      const reciept = await this._currentSubaction.execute(battle);
      this._currentSubaction = null;
      reactions.push(reciept);
    }

    const reciept = {
      preactions,
      reactions,
      messages: this._messages,
      targetEffects: reciepts,
      sourceEffects: {},
      battleEffects: {},
    };

    this._reciept = reciept;
    return reciept;
  }
}

type ActionReciept = {
  preactions: ActionReciept[];
  reactions: ActionReciept[];
  messages: BattleMessage[];
  targetEffects: TargetEffectsReciept[];
  sourceEffects: SourceEffectsReciept;
  battleEffects: BattleEffectsReciept;
};

export type Combatant = EffectReciever<TargetEffects> & {
  getAction: (battle: Battle) => ActionPlan | Promise<ActionParams>;
};

// this round system is still pretty rough
// TODO make this better

export interface Round {
  readonly number: number;
  actions: ActionReciept[];
}

export type RoundReciept = EffectTypeReciept<Round>;

export type BattleMessage = string; // TODO include animation info etc

type BattleEvents = {
  /** The start of the battle, before anything has happened */
  start: [combatants: Combatant[]];
  /** The start of a round, before actions have been chosen */
  round: [round: Round];
  /** An actor has decided on an action */
  ready: [action: ActionParams];
  /** All actors have decided on an action */
  allReady: [actions: ActionParams[]];
  /** An action is about to be executed */
  beforeAction: [action: ActionParams];
  /** An action has been executed, but its effects haven't been sent to the targets yet */
  action: [action: Action];
  /** An effect is about to be sent to a target */
  effect: [effect: EffectTypes, target: Combatant, action: Action];
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

export abstract class Battle extends EventEmitter<BattleEvents> implements EffectReciever<BattleEffects> {
  constructor(public combatants: Combatant[]) {
    super();
  }
  // TODO history searching for things like move restrictions

  abstract runBattle(): Promise<BattleReciept>;
  abstract getRound(): Round;
  abstract runRound(): Promise<RoundReciept>;
  abstract getActions(): Promise<ActionPlan[]>;
  abstract getAction(combatant: Combatant): ActionParams | Promise<ActionParams>;
  abstract getTargets(action: ActionSource, combatant: Combatant): TargetChoice;
  abstract sortActions(actions: ActionPlan[]): ActionPlan[];
  abstract runActions(actions: ActionPlan[]): Promise<ActionReciept[]>;
  abstract runAction(action: ActionPlan): Promise<ActionReciept | undefined>;

  abstract receiveEffects(effects: Partial<Effects<BattleEffects>>): EffectGroupReciept<BattleEffects>;
  abstract receiveWeather(
    effect: Decider<Weather | undefined, BattleContext>,
    action: Action
  ): EffectReciept["weather"];
  abstract receiveEnd(effect: Decider<boolean | undefined, BattleContext>, action: Action): EffectReciept["end"];
  abstract receiveEject(
    effect: Decider<SingleOrArray<Combatant> | undefined, BattleContext>,
    action: Action
  ): EffectReciept["eject"];
}

export interface BattleReciept {
  readonly rounds: RoundReciept[];
  readonly remaining: Combatant[];
  readonly messages: BattleMessage[];
}

// export function flattenActionMessages(action: ActionReciept, into: BattleMessage[] = []) {
//   for (const preaction of action.preactions) flattenActionMessages(preaction, into);
//   into.push(...action.messages);
//   for (const effect of action.effects) into.push(...effect.messages);
//   for (const reaction of action.reactions) flattenActionMessages(reaction, into);
//   return into;
// }

// export function flattenRoundMessages(round: RoundReciept, into: BattleMessage[] = []) {
//   for (const action of round.actions) flattenActionMessages(action, into);
//   into.push(...round.messages);
//   for (const reaction of round.reactions) flattenActionMessages(reaction, into);
//   return into;
// }

// export function flattenBattleMessages(battle: BattleReciept, into: BattleMessage[] = []) {
//   for (const round of battle.rounds) flattenRoundMessages(round, into);
//   into.push(...battle.messages);
//   return into;
// }

export function recoil(target: Combatant, effect: EffectParams<TargetEffects>): ActionPlan {
  const recoil: ActionSource = {
    priority: 0,
    targetingCategory: "Self",
    useAction: ctx =>
      new Action({
        battle: ctx.battle,
        user: target,
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

export function crash(target: Combatant, effect: EffectParams): ActionPlan {
  const crash: ActionSource = {
    priority: 0,
    targetingCategory: "Self",
    useAction: ctx =>
      new Action({
        battle: ctx.battle,
        user: target,
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
export function power(power: number): Decider<Attack, TargetContext> {
  return ({ action }) => {
    if (!(action.params.source instanceof MoveEntry)) throw new Error("power() can only be used with moves");
    const level = action.params.source.user.stats.level;
    const type = action.params.source.effects.type;
    const category = action.params.source.effects.category;
    if (category === "Status") throw new Error("Status moves cannot be used as attacks");
    const stats = action.params.source.user.stats;
    const stat = stats[category === "Physical" ? "attack" : "specialAttack"].value(true);
    const critical = action.params.source.TryCriticalHit() ? action.params.source.GetCriticalMultiplier() : 1;
    const random =
      Math.random() * (config.moves.maxRandomMultiplier - config.moves.minRandomMultiplier) +
      config.moves.minRandomMultiplier;
    const stab = action.params.source.user.species.types.includes(type) ? config.moves.stabMultiplier : 1;
    const multitarget = action.params.targets.length > 1 ? config.moves.multitargetMultiplier : 1;

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
