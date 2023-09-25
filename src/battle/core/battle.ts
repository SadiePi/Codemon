import { EventEmitter } from "../../external.ts";
import { Status } from "../../status.ts";
import { BattleEvents, CombatantEvents } from "./events.ts";
import {
  Action,
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
  SourceEffects,
  SourceEffectsReciept,
  TargetEffects,
  TargetEffectsReciept,
} from "./mod.ts";

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
