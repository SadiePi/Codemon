import {
  Action,
  ActionParams,
  ActionPlan,
  ActionSource,
  ActionUseContext,
  Battle,
  BattleBuilderParams,
  TargetContext,
} from "./battle/core/mod.ts";
import { Immutable } from "./util.ts";

export type StatusExpiry = (expire: () => void) => () => void;

export interface StatusControl {
  name: string;
  activate: () => void;
  deactivate: () => void;
  expiry: StatusExpiry;
}

export type Status<ApplyArgs extends Record<string, unknown>> = {
  name: string;
  description: string;
  slot: string; // for overriding other statuses, e.g. "burn" overrides "poison"
  apply: (args: ApplyArgs) => StatusControl | undefined; // undefined means status failed to apply
};

export class StatusEntry<ApplyArgs extends Record<string, unknown>> {
  private control!: Immutable<StatusControl>; // TODO fix
  private _expirer = () => {};
  private _expired = false;
  public get expired() {
    return this._expired;
  }
  private _active = false;
  public get active() {
    return this._active;
  }

  constructor(public readonly status: Status<ApplyArgs>, args: ApplyArgs) {
    const control = status.apply(args);
    if (!control) {
      this._expired = true;
      return;
    }
    this.control = control;
    this._expirer = this.control.expiry(this.expire);
    this.control.activate();
  }

  public activate() {
    if (this.expired) throw new Error("Cannot activate expired status");
    if (this.active) return;
    this.control.activate();
    this._active = true;
  }

  public deactivate() {
    // expiry deactivates, so no need to check for expired
    if (!this.active) return;
    this.control.deactivate();
    this._active = false;
  }

  public expire() {
    this.control.deactivate();
    this._expirer();
    this._expired = true;
  }
}

export function countdown(duration: number, callback: StatusExpiry): StatusExpiry {
  return expire => {
    let remainingTicks = duration;
    const count = () => {
      if (remainingTicks <= 0) expire();
      remainingTicks--;
    };

    return callback(count);
  };
}

export type StatusEffect<P extends BattleBuilderParams<P>> = Status<TargetContext<P>> & {
  description: string;
  slot: string;
};

export function roundDuration<P extends BattleBuilderParams<P>>(
  duration: number,
  battle: Battle<P>,
  includeThisRound = false
): StatusExpiry {
  let skip = includeThisRound;
  return countdown(duration, (count: () => void) => {
    battle.on("roundEnd", () => {
      if (skip) skip = false;
      else count();
    });
    return () => battle.off("roundEnd", count);
  });
}

export function volatile<P extends BattleBuilderParams<P>>(battle: Battle<P>): StatusExpiry {
  return expire => {
    battle.on("battleReciept", expire);
    return () => battle.off("battleReciept", expire);
  };
}

export const permanent: StatusExpiry = () => () => {};

export function effectAction<P extends BattleBuilderParams<P>>({
  battle,
  effect,
  targets,
  user,
  parent,
}: Omit<ActionParams<P>, "source">): ActionPlan<P> {
  const actionSource: ActionSource<P> = {
    [`${battle.type}Action`]: ({ plan: { targets } }: ActionUseContext<P>): Action<P> =>
      new Action<P>({ battle, user, effect, source: actionSource, targets, parent }),
  } as ActionSource<P>;
  return {
    source: actionSource,
    targets,
    combatant: user,
  };
}
