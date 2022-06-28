// deno-lint-ignore no-unused-vars
import Input from "https://deno.land/x/input@2.0.3/index.ts";
import { EventEmitter } from "https://raw.githubusercontent.com/SadiePi/event-with-wait/master/mod.ts";

import Codemon from "./codemon.ts";

export type Combatant = Codemon;
export type Team = Combatant[];

export type BattleEvents = Record<string, unknown[]>;
export type BattleAction<
  Type = string,
  Actor = unknown,
  Params extends Record<string, unknown> = Record<never, never>
> = {
  type: Type;
  actor: Actor;
} & {
  [K in keyof Params]: Params[K];
};

export abstract class Battle<
  Events extends BattleEvents,
  Action extends BattleAction,
  Result = unknown
> extends EventEmitter<Events> {
  abstract runBattle(): Promise<Result>;
  abstract runRound(): Promise<void>;
  abstract getActions(): Promise<Action[]>;
  abstract getPlayerAction(actor: Codemon): Promise<Action>;
  abstract getAIAction(actor: Codemon): Action;
  abstract sortActions(actions: Action[]): Action[];
  abstract applyAction(action: Action): Promise<void>;
}
