import { EventEmitter } from "../../external.ts";
import { Status } from "../../status.ts";
import {
  Action,
  ActionParams,
  ActionPlan,
  ActionReciept,
  ActionSource,
  ActionUseContext,
  Round,
  RoundReciept,
  BattleEffects,
  BattleEffectsReciept,
  EffectGroup,
  EffectReceiver,
  Effects,
  EffectsReciept,
  SourceEffects,
  SourceEffectsReciept,
  TargetEffects,
  TargetEffectsReciept,
} from "./index.ts";

export type EffectGroups = "target" | "source" | "battle";
export type BattleBuilderParams<P extends BattleBuilderParams<P>> = {
  name: string;
  message: unknown;
  combatant: BaseCombatant<P>;
  conditions: Record<string, Status<BattleContext<P>>>;

  target: EffectGroup<TargetContext<P>, P>;
  source: EffectGroup<SourceContext<P>, P>;
  battle: EffectGroup<BattleContext<P>, P>;
};

export interface BaseBBP extends BattleBuilderParams<BaseBBP> {
  name: "Base";
  message: string;
  combatant: BaseCombatant<BaseBBP>;
  conditions: Record<never, never>;
  target: Record<never, never>;
  source: Record<never, never>;
  battle: Record<never, never>;
}

// Not entirely necessary, but helps to clean up custom battle code
export type BattleBuilder<P extends BattleBuilderParams<P>> = {
  targetEffects: TargetEffects<P>;
  sourceEffects: SourceEffects<P>;
  battleEffects: BattleEffects<P>;
  effects: TargetEffects<P> & SourceEffects<P> & BattleEffects<P>;

  targetEffectsReciept: TargetEffectsReciept<P>;
  sourceEffectsReciept: SourceEffectsReciept<P>;
  battleEffectsReciept: BattleEffectsReciept<P>;
  effectsReciept: TargetEffectsReciept<P> & SourceEffectsReciept<P> & BattleEffectsReciept<P>;

  targetContext: TargetContext<P>;
  sourceContext: SourceContext<P>;
  battleContext: BattleContext<P>;

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
  battleMessage: BattleMessage<P>;

  statusEffect: Status<TargetContext<P>>;
  battleCondition: Status<BattleContext<P>>;
};

export type BattleMessage<P extends BattleBuilderParams<P>> = P["message"];

export type BaseCombatant<P extends BattleBuilderParams<P>> = EffectReceiver<P, "target"> &
  EffectReceiver<P, "source"> & {
    [K in P["name"] as `get${Capitalize<K>}Plan`]: (battle: Battle<P>) => Promise<ActionPlan<P>>;
  };

export type Combatant<P extends BattleBuilderParams<P>> = P["combatant"];

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
  count: "All" | "Any" | number;
  random?: boolean;
}

export type Battle<P extends BattleBuilderParams<P>> = EffectReceiver<P, "battle"> &
  EventEmitter<BattleEvents<P>> & {
    readonly type: P["name"];
    conditions: P["conditions"];

    addCombatant: (this: ThisType<Battle<P>>, combatant: Combatant<P>) => void;
    runBattle: (this: ThisType<Battle<P>>) => Promise<BattleReciept<P>>;
    isOver: (this: ThisType<Battle<P>>) => boolean;
    getRound: (this: ThisType<Battle<P>>) => Round<P>;
    runRound: (this: ThisType<Battle<P>>) => Promise<RoundReciept<P>>;
    getPlans: (this: ThisType<Battle<P>>) => Promise<ActionPlan<P>[]>;
    getCombatants: (this: ThisType<Battle<P>>) => Combatant<P>[];
    getPlan: (this: ThisType<Battle<P>>, combatant: Combatant<P>) => Promise<ActionPlan<P>>;
    getTargetChoice: (this: ThisType<Battle<P>>, action: ActionSource<P>, combatant: Combatant<P>) => TargetChoice<P>;
    sortPlans: (this: ThisType<Battle<P>>, actions: ActionPlan<P>[]) => ActionPlan<P>[];
    runPlans(this: ThisType<Battle<P>>, actions: ActionPlan<P>[]): Promise<ActionReciept<P>[]>;
    runPlan(this: ThisType<Battle<P>>, action: ActionPlan<P>): Promise<ActionReciept<P>>;
    removeCombatant(this: ThisType<Battle<P>>, combatant: Combatant<P>): void;
  };

export interface BattleReciept<P extends BattleBuilderParams<P>> {
  readonly rounds: RoundReciept<P>[];
  readonly remaining: Combatant<P>[];
  readonly messages: BattleMessage<P>[];
}

export type TargetContext<P extends BattleBuilderParams<P>> = {
  target: Combatant<P>;
  source: ActionSource<P>;
  action: Action<P>;
  battle: Battle<P>;
};

export type SourceContext<P extends BattleBuilderParams<P>> = {
  source: ActionSource<P>;
  action: Action<P>;
  battle: Battle<P>;
};

export type BattleContext<P extends BattleBuilderParams<P>> = {
  source: ActionSource<P>;
  action: Action<P>;
  battle: Battle<P>;
};
