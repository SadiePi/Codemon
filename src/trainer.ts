import { ActionSource, Battle, Combatant, Decider, TargetChoice } from "./mod.ts";

export interface Strategy {
  chooseAction: Decider<ActionSource, { combatant: Combatant; battle: Battle }>;
  chooseTarget: Decider<
    Combatant[],
    { action: ActionSource; combatant: Combatant; choice: TargetChoice; battle: Battle }
  >;
}

export interface Trainer {
  strategy: Strategy;
  // TODO
}