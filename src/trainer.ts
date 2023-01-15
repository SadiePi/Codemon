import { ActionSource, Battle, Combatant, TargetChoice } from "./mod.ts";

export interface Strategy {
  chooseAction(combatant: Combatant, battle: Battle): ActionSource;
  chooseTarget(action: ActionSource, combatant: Combatant, choice: TargetChoice, battle: Battle): Combatant[];
}

export interface Trainer {
  strategy: Strategy;
  // TODO
}

export const wild = {} as Trainer;
