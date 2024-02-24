import { EventEmitter } from "../../external.ts";
import { Status, StatusEntry } from "../../status.ts";
import { BattleEvents, CombatantEvents } from "./events.ts";
import {
  Action,
  ActionPlan,
  ActionReceipt,
  ActionSource,
  ActionUseContext,
  Round,
  RoundReceipt,
  BattleEffects,
  BattleEffectsReceipt,
  EffectGroup,
  EffectReceiver,
  SourceEffects,
  SourceEffectsReceipt,
  TargetEffects,
  TargetEffectsReceipt,
} from "./mod.ts";

export type EffectGroups = "target" | "source" | "battle"; // TODO use this

export type BattleBuilderParams<P extends BattleBuilderParams<P>> = {
  name: string;
  message: unknown;
  combatant: BaseCombatant<P>;
  conditions: Record<string, Status<ActionContext<P>>>;

  target: EffectGroup<TargetContext<P>, P>;
  source: EffectGroup<ActionContext<P>, P>;
  battle: EffectGroup<ActionContext<P>, P>;
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

  targetEffectsReceipt: TargetEffectsReceipt<P>;
  sourceEffectsReceipt: SourceEffectsReceipt<P>;
  battleEffectsReceipt: BattleEffectsReceipt<P>;
  effectsReceipt: TargetEffectsReceipt<P> & SourceEffectsReceipt<P> & BattleEffectsReceipt<P>;

  targetContext: TargetContext<P>;
  sourceContext: ActionContext<P>;
  battleContext: ActionContext<P>;

  combatant: Combatant<P>;
  statusEffect: Status<TargetContext<P>>;
  targetChoice: TargetChoice<P>;

  action: Action<P>;
  actionPlan: ActionPlan<P>;
  actionUseContext: ActionUseContext<P>;
  actionSource: ActionSource<P>;
  actionReceipt: ActionReceipt<P>;

  round: Round<P>;
  roundReceipt: RoundReceipt<P>;

  battle: Battle<P>;
  battleReceipt: BattleReceipt<P>;
  battleEvents: BattleEvents<P>;
  battleMessage: BattleMessage<P>;

  battleCondition: Status<ActionContext<P>>;
};

export type BattleMessage<P extends BattleBuilderParams<P>> = P["message"];

export type BaseCombatant<P extends BattleBuilderParams<P>> = EffectReceiver<P, "target"> &
  EffectReceiver<P, "source"> & {
    [K in P["name"] as `get${Capitalize<K>}Plan`]: (battle: Battle<P>) => Promise<ActionPlan<P>>;
  } & EventEmitter<CombatantEvents<P>>;

export type Combatant<P extends BattleBuilderParams<P>> = P["combatant"];

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
    runBattle: (this: ThisType<Battle<P>>) => Promise<BattleReceipt<P>>;
    isOver: (this: ThisType<Battle<P>>) => boolean;
    getRound: (this: ThisType<Battle<P>>) => Round<P>;
    runRound: (this: ThisType<Battle<P>>) => Promise<RoundReceipt<P>>;
    getPlans: (this: ThisType<Battle<P>>) => Promise<ActionPlan<P>[]>;
    getCombatants: (this: ThisType<Battle<P>>) => Combatant<P>[];
    getPlan: (this: ThisType<Battle<P>>, combatant: Combatant<P>) => Promise<ActionPlan<P>>;
    getTargetChoice: (this: ThisType<Battle<P>>, action: ActionSource<P>, combatant: Combatant<P>) => TargetChoice<P>;
    sortPlans: (this: ThisType<Battle<P>>, actions: ActionPlan<P>[]) => ActionPlan<P>[];
    runPlans(this: ThisType<Battle<P>>, actions: ActionPlan<P>[]): Promise<ActionReceipt<P>[]>;
    runPlan(this: ThisType<Battle<P>>, action: ActionPlan<P>): Promise<ActionReceipt<P>>;
    removeCombatant(this: ThisType<Battle<P>>, combatant: Combatant<P>): void;
  };

export interface BattleReceipt<P extends BattleBuilderParams<P>> {
  readonly rounds: RoundReceipt<P>[];
  readonly remaining: Combatant<P>[];
  readonly messages: BattleMessage<P>[];
}

export type TargetContext<P extends BattleBuilderParams<P>> = {
  target: Combatant<P>;
  source: ActionSource<P>;
  action: Action<P>;
  battle: Battle<P>;
};

export type ActionContext<P extends BattleBuilderParams<P>> = {
  source: ActionSource<P>;
  action: Action<P>;
  battle: Battle<P>;
};

export type BattleCondition<P extends BattleBuilderParams<P>> = Status<ActionContext<P>>;
export type BattleConditionEntry<P extends BattleBuilderParams<P>> = StatusEntry<ActionContext<P>>;

export type BattleConditions<P extends BattleBuilderParams<P>> = Record<string, BattleCondition<P>>;
export type BattleConditionEntries<P extends BattleBuilderParams<P>> = Record<string, BattleConditionEntry<P>>;
export type BattleConditionFactors<P extends BattleBuilderParams<P>> = Partial<Record<keyof P["conditions"], number>>;
