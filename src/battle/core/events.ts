import { Round, ActionParams, Action, ActionReciept, RoundReciept, ActionPlan } from "./action.ts";
import { Battle, BattleBuilderParams, BattleReciept, Combatant } from "./battle.ts";
import { Effects, EffectsReciept, TargetEffects, TargetEffectsReciept } from "./effect.ts";

export type BattleEvents<P extends BattleBuilderParams<P>> = {
  start: [combatants: Combatant<P>[]];
  combatantJoin: [combatant: Combatant<P>];
  round: [round: Round<P>];
  ready: [action: ActionPlan<P>];
  allReady: [actions: ActionPlan<P>[]];
  beforeAction: [action: ActionParams<P>];
  action: [action: Action<P>];
  effect: [effect: Effects<P>, target: Combatant<P>, action: Action<P>];
  effectReciept: [reciept: EffectsReciept<P>];
  actionEnd: [action: Action<P>];
  actionReciept: [reciept: ActionReciept<P>];
  roundEnd: [reciept: Round<P>];
  roundReciept: [report: RoundReciept<P>];
  combatantExit: [combatant: Combatant<P>, exitReason: unknown]; // TODO: exit reason
  battleReciept: [report: BattleReciept<P>];
};

export type CombatantEvents<P extends BattleBuilderParams<P>> = {
  enterBattle: [battle: Battle<P>];
  requestAction: [battle: Battle<P>];
  submitAction: [action: ActionPlan<P>];
  beforeAction: [action: ActionParams<P>];
  action: [action: Action<P>];
  effect: [effect: TargetEffects<P>, action: Action<P>];
  effectReciept: [reciept: TargetEffectsReciept<P>];
  actionEnd: [action: Action<P>];
  actionReciept: [reciept: ActionReciept<P>];
  exitBattle: [battle: Battle<P>, exitReason: unknown]; // TODO: exit reason
};
