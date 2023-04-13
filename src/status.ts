import { EffectReciept, Action, Battle, TargetContext } from "./battle.ts";
import { Codemon } from "./codemon.ts";
import { Immutable } from "./util.ts";

export type StatusExpiry = (expire: () => void) => void;

export interface StatusControl {
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
  private control!: Immutable<StatusControl>;
  private _expired = false;
  public get expired() {
    return this._expired;
  }
  private _active = false;
  public get active() {
    return this._active;
  }

  constructor(public status: Status<ApplyArgs>, args: ApplyArgs) {
    const control = status.apply(args);
    if (!control) {
      this._expired = true;
      return;
    }
    this.control = control;
    this.control.expiry(this.expire);
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
    this._expired = true;
  }
}

export type StatusEffect = Status<{ target: Codemon; effect: EffectReciept; context: TargetContext }>;
export type Weather = Status<{ source: Action; battle: Battle }>;
export type Ability = Status<{ self: Codemon; battle: Battle }>;

export const duration: (duration: number, battle: Battle) => StatusExpiry = (duration, battle) => expire => {
  const start = battle.getRound().number;
  battle.on("roundEnd", () => {
    if (battle.getRound().number - start >= duration) expire();
  });
};

export const volatile: (battle: Battle) => StatusExpiry = battle => expire => {
  battle.on("battleReciept", expire);
};

// export function effectAction(target: Combatant, effect: EffectParams): ActionPlan {
//   const source: ActionSource = {
//     targetingCategory: "Self",
//     useAction: ({ targets }): Action => new Action({ effect, source, targets }),
//   };
//   return {
//     source,
//     targets: [target],
//     user: target,
//   };
// }
