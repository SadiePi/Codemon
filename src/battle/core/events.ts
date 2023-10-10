import { Round, ActionParams, Action, ActionReciept, RoundReciept, ActionPlan } from "./action.ts";
import {
  Battle,
  BattleBuilderParams,
  BattleContext,
  BattleReciept,
  Combatant,
  SourceContext,
  TargetContext,
} from "./battle.ts";
import {
  BattleEffects,
  BattleEffectsReciept,
  Effects,
  EffectsReciept,
  SourceEffects,
  SourceEffectsReciept,
  TargetEffects,
  TargetEffectsReciept,
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
  effectReciept: [reciept: EffectsReciept<P>];
  actionEnd: [action: Action<P>];
  actionReciept: [reciept: ActionReciept<P>];
  roundEnd: [reciept: Round<P>];
  roundReciept: [report: RoundReciept<P>];
  combatantExit: [combatant: Combatant<P>, exitReason: unknown]; // TODO: exit reason
  battleReciept: [report: BattleReciept<P>];

  receiveBattleEffects: [effects: BattleEffects<P>, context: BattleContext<P>];
  battleEffectReciept: [reciept: BattleEffectsReciept<P>];
};

export type TargetEvents<P extends BattleBuilderParams<P>> = {
  receiveTargetEffects: [effects: TargetEffects<P>, context: TargetContext<P>];
  targetEffectReciept: [reciept: TargetEffectsReciept<P>, context: TargetContext<P>];
};

export type SourceEvents<P extends BattleBuilderParams<P>> = {
  requestAction: [battle: Battle<P>];
  submitAction: [action: ActionPlan<P>];
  beforeAction: [action: ActionParams<P>];
  action: [action: Action<P>];
  inflictEffects: [effects: TargetEffects<P> & SourceEffects<P>, context: TargetContext<P>];
  actionEnd: [action: Action<P>];
  actionReciept: [reciept: ActionReciept<P>];
  receiveSourceEffects: [effects: SourceEffects<P>, context: SourceContext<P>];
  sourceEffectReciept: [reciept: SourceEffectsReciept<P>];
};

export type CombatantEvents<P extends BattleBuilderParams<P>> = {
  enterBattle: [battle: Battle<P>];
  receiveEffects: [effect: TargetEffects<P> & SourceEffects<P>, context: TargetContext<P>];
  effectReciept: [reciept: TargetEffectsReciept<P> & SourceEffectsReciept<P>, context: TargetContext<P>];
  exitBattle: [battle: Battle<P>, exitReason: unknown]; // TODO: exit reason
} & TargetEvents<P> &
  SourceEvents<P>;
