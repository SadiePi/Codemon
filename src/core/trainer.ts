import { ActionSource, Battle, Combatant, TargetChoice } from "./battle.ts";

export interface Strategy {
  chooseAction(combatant: Combatant, battle: Battle): ActionSource;
  chooseTarget(action: ActionSource, combatant: Combatant, choice: TargetChoice, battle: Battle): Combatant[]
}

export interface Trainer {
  strategy: Strategy;
  // TODO
}