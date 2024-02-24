import { EventEmitter } from "../../external.ts";
import {
  Battle,
  BattleBuilderParams,
  BattleMessage,
  Combatant,
  BattleEffectsReceipt,
  EffectParams,
  SourceEffectsReceipt,
  TargetEffectsReceipt,
  TargetingCategory,
  GroupContext,
  TargetEffects,
} from "./mod.ts";

export class ActionSet<P extends BattleBuilderParams<P>> extends EventEmitter<{
  begin: [plans: ActionPlan<P>[]];
  plan: [plan: ActionPlan<P>];
  action: [action: Action<P>, plan: ActionPlan<P>];
  receipt: [receipt: ActionReceipt<P>, action: Action<P>, plan: ActionPlan<P>];
  end: [receipts: ActionReceipt<P>[], plans: ActionPlan<P>[]];
}> {
  private _allow = true;
  public get allow() {
    return this._allow;
  }
  public plans: ActionPlan<P>[] = [];
  public receipts: ActionReceipt<P>[] = [];

  constructor() {
    super();
  }

  public add(plan: ActionPlan<P>) {
    if (!this.allow) throw new Error("ActionSet already executed or currently executing");
    this.plans.push(plan);
  }

  public async execute(battle: Battle<P>): Promise<ActionReceipt<P>[]> {
    if (!this.allow) throw new Error("ActionSet already executed or currently executing");
    this._allow = false;
    this.plans = battle.sortPlans(this.plans);
    this.wait("begin", this.plans);
    for (const plan of this.plans) {
      this.wait("plan", plan);
      const decider = plan.source[`${battle.type}Action`] as (context: ActionUseContext<P>) => Action<P> | null;
      const action = decider.apply(plan.source, [{ plan, battle }]);
      if (!action) continue;
      this.wait("action", action, plan);
      const receipt = await action.execute(battle);
      this.receipts.push(receipt);
      this.wait("receipt", receipt, action, plan);
    }
    this.wait("end", this.receipts, this.plans);
    return this.receipts;
  }
}

export abstract class BattleNode<P extends BattleBuilderParams<P>, Receipt> extends EventEmitter<{
  begin: [];
  preaction: [preaction: Action<P>];
  preactionReceipt: [receipt: ActionReceipt<P>];
  afterPreactions: [receipts: ActionReceipt<P>[]];
  beforeReactions: [receipts: ActionReceipt<P>[]];
  reaction: [reaction: Action<P>];
  reactionReceipt: [receipt: ActionReceipt<P>];
  subaction: [subaction: Action<P>];
  subactionReceipt: [receipt: ActionReceipt<P>];
  message: [message: BattleMessage<P>];
  end: [receipt: BattleNodeReceipt<P, Receipt>];
}> {
  public cancel = false;

  public preactions = new ActionSet<P>();
  public reactions = new ActionSet<P>();

  constructor() {
    super();

    this.preactions.on("action", preaction => {
      this.wait("preaction", preaction);
      this.wait("subaction", preaction);
    });
    this.reactions.on("action", reaction => {
      this.wait("reaction", reaction);
      this.wait("subaction", reaction);
    });

    this.preactions.on("receipt", receipt => {
      this.wait("preactionReceipt", receipt);
      this.wait("subactionReceipt", receipt);
    });
    this.reactions.on("receipt", receipt => {
      this.wait("reactionReceipt", receipt);
      this.wait("subactionReceipt", receipt);
    });
  }

  protected _currentSubaction: Action<P> | null = null;
  public get currentSubaction() {
    return this._currentSubaction;
  }

  protected _receipt: BattleNodeReceipt<P, Receipt> | null = null;
  public get receipt() {
    return this._receipt;
  }

  protected _messages: BattleMessage<P>[] = [];
  public message(...message: BattleMessage<P>[]) {
    this._messages.push(message);
  }

  public async execute(battle: Battle<P>): Promise<BattleNodeReceipt<P, Receipt>> {
    if (this.receipt) throw new Error("BattleNode has already been executed or is currently executing");
    await this.preactions.execute(battle);
    const _receipt = this.cancel ? {} : await this.doExecute(battle);
    await this.reactions.execute(battle);
    const receipt = Object.assign(
      {
        success: !this.cancel,
        preactions: this.preactions.receipts,
        reactions: this.reactions.receipts,
        messages: this._messages,
      },
      _receipt
    ) as BattleNodeReceipt<P, Receipt>;
    this._receipt = receipt;
    return receipt;
  }

  protected abstract doExecute(battle: Battle<P>): Promise<Receipt>;
}

export type BattleNodeReceipt<P extends BattleBuilderParams<P>, Extra> =
  | ({
      success: true;
      preactions: ActionReceipt<P>[];
      messages: BattleMessage<P>[];
      reactions: ActionReceipt<P>[];
    } & Extra)
  | {
      success: false;
      messages: BattleMessage<P>[];
    };

interface BaseRoundReceipt<P extends BattleBuilderParams<P>> {
  number: number;
  actions: ActionReceipt<P>[];
}
export type RoundReceipt<P extends BattleBuilderParams<P>> = BattleNodeReceipt<P, BaseRoundReceipt<P>>;
export class Round<P extends BattleBuilderParams<P>> extends BattleNode<P, BaseRoundReceipt<P>> {
  public actions = new ActionSet<P>();

  constructor(public readonly number: number) {
    super();
  }

  async doExecute(battle: Battle<P>) {
    const plans = battle.sortPlans(await battle.getPlans());
    plans.forEach(plan => this.actions.add(plan));
    await this.actions.execute(battle);

    return {
      number: this.number,
      actions: this.actions.receipts,
    };
  }
}

interface BaseActionReceipt<P extends BattleBuilderParams<P>> {
  targetEffects: Partial<TargetEffectsReceipt<P>>[];
  sourceEffects: Partial<SourceEffectsReceipt<P>>;
  battleEffects: Partial<BattleEffectsReceipt<P>>;
}
export type ActionReceipt<P extends BattleBuilderParams<P>> = BattleNodeReceipt<P, BaseActionReceipt<P>>;

export class Action<P extends BattleBuilderParams<P>> extends BattleNode<P, BaseActionReceipt<P>> {
  constructor(public params: ActionParams<P>) {
    super();
  }

  public doExecute() {
    const { targets, user } = this.params;
    user.emit("action", this);
    // let [applyRecoil, applyCrash] = [false, false];
    const receipts: Partial<TargetEffectsReceipt<P>>[] = [];
    for (const target of targets) {
      // this is ... not great
      const battleType = this.params.battle.type;
      const capitalizedBattleType = (battleType[0].toUpperCase() + battleType.slice(1)) as Capitalize<P["name"]>;
      const receiver = target[`receive${capitalizedBattleType}TargetEffects`] as (
        group: TargetEffects<P>,
        context: GroupContext<P, "target">
      ) => Partial<TargetEffectsReceipt<P>> | null;

      const effect = { ...this.params.effect };
      user.emit("inflictEffects", effect, {
        action: this,
        target,
        source: this.params.source,
        battle: this.params.battle,
      });

      const receipt = receiver.apply(target, [
        effect,
        {
          action: this,
          target,
          source: this.params.source,
          battle: this.params.battle,
        },
      ]) as TargetEffectsReceipt<P>;

      if (receipt) {
        receipts.push(receipt);
        if (receipt.remove) this.params.battle.removeCombatant(target);
      }

      // if (receipt) applyRecoil = true;
      // if (!receipt) applyCrash = true;

      // TODO this is weirder than I thought
      // const recoilEffect = decide(this.params.effect.recoil ?? undefined, { action: this, combatant: user });
      // if (applyRecoil && recoilEffect) this.addReaction(recoil(user, recoilEffect));

      // const crashEffect = decide(this.params.effect.crash ?? undefined, { action: this, combatant: user });
      // if (applyCrash && crashEffect) this.addReaction(recoil(user, crashEffect));
    }
    return Promise.resolve({
      targetEffects: receipts,
      sourceEffects: [] as SourceEffectsReceipt<P>,
      battleEffects: [] as BattleEffectsReceipt<P>,
    });
  }
}

export type ActionPlan<P extends BattleBuilderParams<P>> = {
  combatant: Combatant<P>;
  source: ActionSource<P>;
  targets: Combatant<P>[];
};

export type ActionUseContext<P extends BattleBuilderParams<P>> = {
  battle: Battle<P>;
  plan: ActionPlan<P>;
};

export type ActionSource<P extends BattleBuilderParams<P>> = {
  [K in P["name"] as `${K}Action`]: (context: ActionUseContext<P>) => Action<P> | null;
} & {
  priority?: number;
  target: TargetingCategory<P>;
};

export interface ActionParams<P extends BattleBuilderParams<P>> {
  battle: Battle<P>;
  user: Combatant<P>;
  source: ActionSource<P>;
  effect: EffectParams<P>;
  targets: Combatant<P>[];
  parent?: Action<P>;
}
