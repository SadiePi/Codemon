// deno-lint-ignore no-unused-vars
import Input from "https://deno.land/x/input@2.0.3/index.ts";
import { EventEmitter } from "https://raw.githubusercontent.com/SadiePi/event-with-wait/master/mod.ts";

import Codemon from "./codemon.ts";

export type BattleEvents = Record<string, unknown[]> & Record<number, never> & Record<symbol, never>;

export type BattleAction<
  Type = string,
  // deno-lint-ignore no-explicit-any
  Actor = any, // TODO This should be unknown instead of any but playerInterface doesn't like that
  Pre extends Record<string, unknown> = Record<never, never>,
  Post extends Record<string, unknown> = Record<never, never>
> = {
  type: Type;
  actor: Actor;
  pre: {
    type: Type;
    actor: Actor;
  } & Pre;
  post: {
    type: Type;
    actor: Actor;
  } & Post;
};

export type StatusEffect<B extends Battle> = {
  name: string;
  description: string;
  volatile: boolean;
  apply: (target: Codemon<B>, source: Codemon<B>, battle: B) => void;
  // TODO shouldUnapply: (target: Codemon<B>, source: Codemon<B>, battle: B) => boolean;
  unapply: (target: Codemon<B>, source: Codemon<B>, battle: B) => void;
};

type HistoryItem<Action extends BattleAction> = {
  pre: Action["pre"];
  post?: Action["post"];
  round: number;
};

export abstract class Battle<
  Action extends BattleAction = BattleAction,
  Events extends BattleEvents = BattleEvents,
  Result = unknown
> extends EventEmitter<Events> {
  private _round = 0;
  public get round(): number {
    return this._round;
  }

  private _history: HistoryItem<Action>[] = [];
  public getHistory(filter?: { actor?: Action["pre"]["actor"]; round?: number; type?: Action["pre"]["type"] }) {
    if (!filter) return this._history.at(-1);
    for (const hi of this._history) {
      if (filter.actor && filter.actor !== hi.pre.actor && filter.actor !== hi.post?.actor) continue;
      if (filter.round && filter.round !== hi.round) continue;
      if (filter.type && filter.type !== hi.pre.type && hi.post?.type) continue;
      return hi;
    }
  }
  protected pushHistory(...actions: { pre: Action["pre"]; post?: Action["post"] }[]) {
    this._history.push(...actions.map<HistoryItem<Action>>(a => ({ round: this.round, pre: a.pre, post: a.post })));
  }

  private playerInterface: (actor: Action["actor"]) => Promise<Action["pre"]> | Action["pre"] = this.getAIAction;
  public setPlayerInterface(i: (actor: Action["actor"]) => Promise<Action["pre"]> | Action["pre"]) {
    this.playerInterface = i;
  }
  public async getPlayerAction(actor: Action["actor"]): Promise<Action["pre"]> {
    return await this.playerInterface(actor);
  }

  abstract runBattle(): Promise<Result>;
  abstract runRound(): Promise<void>;
  abstract getTargets(actor: Action["actor"], action: Action["pre"]): Action["actor"][];
  abstract getActions(): Promise<Action["pre"][]>;
  // abstract getTeamActions(): Promise<Action["pre"][]>;
  abstract getAIAction(actor: Action["actor"]): Action["pre"];
  abstract sortActions(actions: Action["pre"][]): Action["pre"][];
  abstract applyAction(action: Action["pre"]): Promise<Action["post"] | undefined>;
}
