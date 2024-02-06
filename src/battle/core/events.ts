import { Round, ActionParams, Action, ActionReceipt, RoundReceipt, ActionPlan } from "./action.ts";
import { Battle, BattleBuilderParams, ActionContext, BattleReceipt, Combatant, TargetContext } from "./battle.ts";
import {
  BattleEffects,
  BattleEffectsReceipt,
  Effects,
  EffectsReceipt,
  SourceEffects,
  SourceEffectsReceipt,
  TargetEffects,
  TargetEffectsReceipt,
} from "./effect.ts";

export type BattleEvents<P extends BattleBuilderParams<P>> = {
  start: [combatants: Combatant<P>[]];
  combatantJoin: [combatant: Combatant<P>];
  round: [round: Round<P>];
  ready: [action: ActionPlan<P>];
  allReady: [actions: ActionPlan<P>[]];
  beforeAction: [action: ActionParams<P>];
  action: [action: Action<P>];
  effect: [effect: Effects<P>, context: TargetContext<P>];
  effectReceipt: [receipt: EffectsReceipt<P>];
  actionEnd: [action: Action<P>];
  actionReceipt: [receipt: ActionReceipt<P>];
  roundEnd: [receipt: Round<P>];
  roundReceipt: [report: RoundReceipt<P>];
  combatantExit: [combatant: Combatant<P>, exitReason: unknown]; // TODO: exit reason
  battleReceipt: [report: BattleReceipt<P>];

  receiveBattleEffects: [effects: BattleEffects<P>, context: ActionContext<P>];
  battleEffectReceipt: [receipt: BattleEffectsReceipt<P>];
};

export type TargetEvents<P extends BattleBuilderParams<P>> = {
  receiveTargetEffects: [effects: TargetEffects<P>, context: TargetContext<P>];
  targetEffectReceipt: [receipt: TargetEffectsReceipt<P>, context: TargetContext<P>];
};

export type SourceEvents<P extends BattleBuilderParams<P>> = {
  requestAction: [battle: Battle<P>];
  submitAction: [action: ActionPlan<P>];
  beforeAction: [action: ActionParams<P>];
  action: [action: Action<P>];
  inflictEffects: [effects: TargetEffects<P> & SourceEffects<P>, context: TargetContext<P>];
  actionEnd: [action: Action<P>];
  actionReceipt: [receipt: ActionReceipt<P>];
  receiveSourceEffects: [effects: SourceEffects<P>, context: ActionContext<P>];
  sourceEffectReceipt: [receipt: SourceEffectsReceipt<P>];
};

export type CombatantEvents<P extends BattleBuilderParams<P>> = {
  enterBattle: [battle: Battle<P>];
  receiveEffects: [effect: TargetEffects<P> & SourceEffects<P>, context: TargetContext<P>];
  effectReceipt: [receipt: TargetEffectsReceipt<P> & SourceEffectsReceipt<P>, context: TargetContext<P>];
  exitBattle: [battle: Battle<P>, exitReason: unknown]; // TODO: exit reason
} & TargetEvents<P> &
  SourceEvents<P>;
