import { Decider, decide } from "../decision.ts";
import { EventEmitter } from "../external.ts";

export const TCQuantifiers = ["Every", "Any", "Random"] as const;
export type TCQuantifier = (typeof TCQuantifiers)[number];
export const TCPositions = ["Adjacent", "Non-Adjacent"] as const;
export type TCPosition = (typeof TCPositions)[number];
// TODO? export type TCType = "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice" | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy"
export const TCAlignment = ["Ally", "Foe"] as const;
export type TCAlignment = (typeof TCAlignment)[number];
export const TCSpecials = ["Self", "Team", "All"] as const;
export type TCSpecial = (typeof TCSpecials)[number];
export type TargetingCategory =
  | TCSpecial
  | TCQuantifier
  | `${TCQuantifier} ${TCPosition}`
  | `${TCQuantifier} ${TCAlignment}`
  | `${TCQuantifier} ${TCPosition} ${TCAlignment}`;

export type TargetEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<TargetContext<P>, P["target"]>;
export type SourceEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<SourceContext<P>, P["source"]>;
export type BattleEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<BattleContext<P>, P["battle"]>;
export type Effects<P extends BattleBuilderParams<P>> = TargetEffects<P> & SourceEffects<P> & BattleEffects<P>;

export type TargetEffectsReciept<P extends BattleBuilderParams<P>> = EffectGroupReciept<TargetContext<P>, P["target"]>;
export type SourceEffectsReciept<P extends BattleBuilderParams<P>> = EffectGroupReciept<SourceContext<P>, P["source"]>;
export type BattleEffectsReciept<P extends BattleBuilderParams<P>> = EffectGroupReciept<BattleContext<P>, P["battle"]>;
export type EffectsReciept<P extends BattleBuilderParams<P>> = TargetEffectsReciept<P> &
  SourceEffectsReciept<P> &
  BattleEffectsReciept<P>;

export type TargetContext<P extends BattleBuilderParams<P>> = {
  user: Combatant<P>;
  target: Combatant<P>;
  action: Action<P>;
};

export type SourceContext<P extends BattleBuilderParams<P>> = {
  combatant: Combatant<P>;
  action: Action<P>;
};

export type BattleContext<P extends BattleBuilderParams<P>> = {
  combatant: Combatant<P>;
  action: Action<P>;
};

export type TargetEffectParams<P extends BattleBuilderParams<P>> = EffectGroupParams<TargetContext<P>, P["target"]>;
export type SourceEffectParams<P extends BattleBuilderParams<P>> = EffectGroupParams<SourceContext<P>, P["source"]>;
export type BattleEffectParams<P extends BattleBuilderParams<P>> = EffectGroupParams<BattleContext<P>, P["battle"]>;
export type EffectParams<P extends BattleBuilderParams<P>> = TargetEffectParams<P> &
  SourceEffectParams<P> &
  BattleEffectParams<P>;

export type EffectType<Context, Effect, Extra = Record<never, never>> = {
  effect: Decider<Effect | undefined, Context>;
  reciept: EffectTypeReciept<Effect, Extra>;
};

export type BaseEffectReciept<E> =
  | {
      success: true;
      messages: BattleMessage[];
      actual: E;
    }
  | {
      success: false;
      messages: BattleMessage[];
    };

export type EffectTypeReciept<E, Extra = Record<never, never>> = BaseEffectReciept<E> & Extra;

export type EffectGroup<Context> = Record<string, EffectType<Context, unknown, unknown>>;
export type EffectGroupReciept<C, G extends EffectGroup<C>> = {
  [K in keyof G]: G[K]["reciept"];
};

export type EffectReciever<P extends BattleBuilderParams<P>, C, E extends EffectGroup<C>> = {
  [K in keyof E as K extends string ? `receive${Capitalize<K>}` : never]-?: (
    effect: E[K]["effect"],
    action: Action<P>
  ) => E[K]["reciept"];
} & {
  receiveEffects: (
    effects: Partial<EffectGroupEffects<C, E>>,
    action: Action<P>
  ) => Partial<EffectGroupReciept<C, E>> | null;
};

export type EffectGroupParams<C, G extends EffectGroup<C>> = {
  [K in keyof G]?: G[K]["effect"];
};
// & {
//  // accuracy?: Decider<number | boolean, TargetContext>; // boolean means never or always hit
//};

export type EffectGroupEffects<C, G extends EffectGroup<C>> = {
  [K in keyof G]?: G[K]["effect"];
};

export type EffectSource<P extends BattleBuilderParams<P>> = EffectGroupParams<TargetContext<P>, P["target"]> &
  EffectGroupParams<SourceContext<P>, P["source"]> &
  EffectGroupParams<BattleContext<P>, P["battle"]> & {
    name: string;
    description: string;
    target: TargetingCategory;
  };

export type ActionPlan<P extends BattleBuilderParams<P>> = {
  combatant: Combatant<P>;
  source: ActionSource<P>;
  targets: Combatant<P>[];
};

export type ActionUseContext<P extends BattleBuilderParams<P>> = {
  battle: Battle<P>;
  plan: ActionPlan<P>;
};

export type ActionSource<P extends BattleBuilderParams<P>> = {
  priority?: number;
  category: TargetingCategory;
  useAction: (context: ActionUseContext<P>) => Action<P> | null;
};

export interface ActionParams<P extends BattleBuilderParams<P>> {
  battle: Battle<P>;
  user: Combatant<P>;
  source: ActionSource<P>;
  effect: EffectParams<P>;
  targets: Combatant<P>[];
  parent?: Action<P>;
}

export class Action<P extends BattleBuilderParams<P>> extends EventEmitter<{
  begin: [];
  preaction: [preaction: Action<P>];
  preactionReciept: [reciept: ActionReciept<P>];
  afterPreactions: [reciepts: ActionReciept<P>[]];
  beforeReactions: [reciepts: ActionReciept<P>[]];
  reaction: [reaction: Action<P>];
  reactionReciept: [reciept: ActionReciept<P>];
  subaction: [subaction: Action<P>];
  subactionReciept: [reciept: ActionReciept<P>];
  message: [message: BattleMessage];
  end: [reciept: ActionReciept<P>];
}> {
  private _allowPreactions = true;
  private _preactions: ActionPlan<P>[] = [];
  private _preactionReciepts: ActionReciept<P>[] = [];
  public get allowPreactions() {
    return this._allowPreactions;
  }
  public addPreaction(action: ActionPlan<P>) {
    if (!this.allowPreactions) throw new Error("Preactions are not allowed at this time");
    this._preactions.push(action);
  }

  private _allowReactions = true;
  private _reactions: ActionPlan<P>[] = [];
  private _reactionReciepts: ActionReciept<P>[] = [];
  public get allowReactions() {
    return this._allowReactions;
  }
  public addReaction(action: ActionPlan<P>) {
    if (!this.allowReactions) throw new Error("Reactions are not allowed at this time");
    this._reactions.push(action);
  }

  private _currentSubaction: Action<P> | null = null;
  public get currentSubaction() {
    return this._currentSubaction;
  }

  private _messages: BattleMessage[] = [];
  public message(message: BattleMessage) {
    this._messages.push(message);
  }

  public cancel = false;

  constructor(public params: ActionParams<P>) {
    super();
  }

  private _reciept: ActionReciept<P> | null = null;
  public get reciept() {
    return this._reciept;
  }

  public async execute(battle: Battle<P>): Promise<ActionReciept<P>> {
    if (this.reciept) throw new Error("Action has already been executed");
    const { targets, user } = this.params;
    await this.wait("begin");

    this._allowPreactions = false;
    const preactions: ActionReciept<P>[] = [];
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

    const reciepts: Partial<TargetEffectsReciept<P>>[] = [];
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
    const reactions: ActionReciept<P>[] = [];
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

    const reciept: ActionReciept<P> = {
      success: true,
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

export type ActionReciept<P extends BattleBuilderParams<P>> =
  | {
      success: true;
      preactions: ActionReciept<P>[];
      reactions: ActionReciept<P>[];
      messages: BattleMessage[];
      targetEffects: Partial<TargetEffectsReciept<P>>[];
      sourceEffects: Partial<SourceEffectsReciept<P>>;
      battleEffects: Partial<BattleEffectsReciept<P>>;
    }
  | {
      success: false;
    };

// type EventHandler<E extends Record<string, unknown[]>> = {
//   [K in keyof E]?: (...event: E[K]) => void;
// };

export type BattleBuilderParams<P extends BattleBuilderParams<P>> = {
  target: EffectGroup<TargetContext<P>>;
  source: EffectGroup<SourceContext<P>>;
  battle: EffectGroup<BattleContext<P>>;
};

export type BattleBuilder<P extends BattleBuilderParams<P>> = {
  targetEffects: TargetEffects<P>;
  sourceEffects: SourceEffects<P>;
  battleEffects: BattleEffects<P>;
  effects: TargetEffects<P> & SourceEffects<P> & BattleEffects<P>;

  targetEffectsReciept: TargetEffectsReciept<P>;
  sourceEffectsReciept: SourceEffectsReciept<P>;
  battleEffectsReciept: BattleEffectsReciept<P>;
  effectsReciept: TargetEffectsReciept<P> & SourceEffectsReciept<P> & BattleEffectsReciept<P>;

  targetContext: {
    user: Combatant<P>;
    target: Combatant<P>;
    action: Action<P>;
  };
  sourceContext: {
    combatant: Combatant<P>;
    action: Action<P>;
  };
  battleContext: {
    combatant: Combatant<P>;
    action: Action<P>;
  };

  combatant: Combatant<P>;
  targetChoice: TargetChoice<P>;

  action: Action<P>;
  actionPlan: ActionPlan<P>;
  actionUseContext: ActionUseContext<P>;
  actionSource: ActionSource<P>;
  actionReciept: ActionReciept<P>;

  round: Round<P>;
  roundReciept: RoundReciept<P>;

  battle: Battle<P>;
  battleReciept: BattleReciept<P>;
  battleEvents: BattleEvents<P>;
};

export type Combatant<P extends BattleBuilderParams<P>> = EffectReciever<P, TargetContext<P>, P["target"]> &
  EffectReciever<P, SourceContext<P>, P["source"]> & {
    getAction: (battle: Battle<P>) => BattleBuilder<P>["actionPlan"];
  };

// this round system is still pretty rough
// TODO make this better

export interface Round<P extends BattleBuilderParams<P>> {
  readonly number: number;
  actions: ActionReciept<P>[];
}

export type RoundReciept<P extends BattleBuilderParams<P>> = EffectTypeReciept<Round<P>>;

export type BattleMessage = string; // TODO include animation info etc

export type BattleEvents<P extends BattleBuilderParams<P>> = {
  /** The start of the battle, before anything has happened */
  start: [combatants: Combatant<P>[]];
  /** The start of a round, before actions have been chosen */
  round: [round: Round<P>];
  /** An actor has decided on an action */
  ready: [action: ActionParams<P>];
  /** All actors have decided on an action */
  allReady: [actions: ActionParams<P>[]];
  /** An action is about to be executed */
  beforeAction: [action: ActionParams<P>];
  /** An action has been executed, but its effects haven't been sent to the targets yet */
  action: [action: Action<P>];
  /** An effect is about to be sent to a target */
  effect: [effect: Effects<P>, target: Combatant<P>, action: Action<P>];
  /** An effect has been sent to a target */
  effectReciept: [reciept: EffectsReciept<P>];
  /** The end of an action, before reactions are run */
  actionEnd: [action: Action<P>];
  /** An action has been executed, and its effects have been sent to the targets */
  actionReciept: [reciept: ActionReciept<P>];
  /** The end of a round, after all actions are done, before reactions are run */
  roundEnd: [reciept: Round<P>];
  /** The end of a round, after all actions and reactions are done */
  roundReciept: [report: RoundReciept<P>];
  /** The end of the battle, after all rounds are done */
  battleReciept: [report: BattleReciept<P>];
};

export interface TargetChoice<P extends BattleBuilderParams<P>> {
  targets: Combatant<P>[];
  count: "All" | number;
  random?: boolean;
}

export type Battle<P extends BattleBuilderParams<P>> = EffectReciever<P, BattleContext<P>, P["battle"]> &
  EventEmitter<BattleEvents<P>> & {
    runBattle: (this: ThisType<Battle<P>>) => Promise<BattleReciept<P>>;
    getRound: (this: ThisType<Battle<P>>) => Round<P>;
    runRound: (this: ThisType<Battle<P>>) => Promise<RoundReciept<P>>;
    getActions: (this: ThisType<Battle<P>>) => Promise<ActionPlan<P>[]>;
    getAction: (this: ThisType<Battle<P>>, combatant: Combatant<P>) => ActionPlan<P> | Promise<ActionPlan<P>>;
    getTargets: (
      this: ThisType<Battle<P>>,
      action: ActionSource<P>,
      combatant: Combatant<P>
    ) => TargetChoice<P> | Promise<TargetChoice<P>>;
    sortActions: (this: ThisType<Battle<P>>, actions: ActionPlan<P>[]) => ActionPlan<P>[];
    runActions(actions: ActionPlan<P>[]): Promise<ActionReciept<P>[]>;
    runAction(action: ActionPlan<P>): Promise<ActionReciept<P>>;
  };

export interface BattleReciept<P extends BattleBuilderParams<P>> {
  readonly rounds: RoundReciept<P>[];
  readonly remaining: Combatant<P>[];
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

export function recoil<P extends BattleBuilderParams<P>>(target: Combatant<P>, effect: EffectParams<P>): ActionPlan<P> {
  const recoil: ActionSource<P> = {
    priority: 0,
    category: "Self",
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

export function crash<P extends BattleBuilderParams<P>>(target: Combatant<P>, effect: EffectParams<P>): ActionPlan<P> {
  const crash: ActionSource<P> = {
    priority: 0,
    category: "Self",
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
