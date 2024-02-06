import { EventEmitter } from "../../external.ts";
import {
  Battle,
  BattleBuilderParams,
  BattleMessage,
  Combatant,
  BattleEffectsReciept,
  EffectParams,
  SourceEffectsReciept,
  TargetEffectsReciept,
  TargetingCategory,
  GroupContext,
  TargetEffects,
} from "./mod.ts";

export class ActionSet<P extends BattleBuilderParams<P>> extends EventEmitter<{
  begin: [plans: ActionPlan<P>[]];
  plan: [plan: ActionPlan<P>];
  action: [action: Action<P>, plan: ActionPlan<P>];
  reciept: [reciept: ActionReciept<P>, action: Action<P>, plan: ActionPlan<P>];
  end: [reciepts: ActionReciept<P>[], plans: ActionPlan<P>[]];
}> {
  private _allow = true;
  public get allow() {
    return this._allow;
  }
  public plans: ActionPlan<P>[] = [];
  public reciepts: ActionReciept<P>[] = [];

  constructor() {
    super();
  }

  public add(plan: ActionPlan<P>) {
    if (!this.allow) throw new Error("ActionSet already executed or currently executing");
    this.plans.push(plan);
  }

  public async execute(battle: Battle<P>): Promise<ActionReciept<P>[]> {
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
      const reciept = await action.execute(battle);
      this.reciepts.push(reciept);
      this.wait("reciept", reciept, action, plan);
    }
    this.wait("end", this.reciepts, this.plans);
    return this.reciepts;
  }
}

export abstract class BattleNode<P extends BattleBuilderParams<P>, Reciept> extends EventEmitter<{
  begin: [];
  preaction: [preaction: Action<P>];
  preactionReciept: [reciept: ActionReciept<P>];
  afterPreactions: [reciepts: ActionReciept<P>[]];
  beforeReactions: [reciepts: ActionReciept<P>[]];
  reaction: [reaction: Action<P>];
  reactionReciept: [reciept: ActionReciept<P>];
  subaction: [subaction: Action<P>];
  subactionReciept: [reciept: ActionReciept<P>];
  message: [message: BattleMessage<P>];
  end: [reciept: BattleNodeReciept<P, Reciept>];
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

    this.preactions.on("reciept", reciept => {
      this.wait("preactionReciept", reciept);
      this.wait("subactionReciept", reciept);
    });
    this.reactions.on("reciept", reciept => {
      this.wait("reactionReciept", reciept);
      this.wait("subactionReciept", reciept);
    });
  }

  protected _currentSubaction: Action<P> | null = null;
  public get currentSubaction() {
    return this._currentSubaction;
  }

  protected _reciept: BattleNodeReciept<P, Reciept> | null = null;
  public get reciept() {
    return this._reciept;
  }

  protected _messages: BattleMessage<P>[] = [];
  public message(...message: BattleMessage<P>[]) {
    this._messages.push(message);
  }

  public async execute(battle: Battle<P>): Promise<BattleNodeReciept<P, Reciept>> {
    if (this.reciept) throw new Error("BattleNode has already been executed or is currently executing");
    await this.preactions.execute(battle);
    const _reciept = this.cancel ? {} : await this.doExecute(battle);
    await this.reactions.execute(battle);
    const reciept = Object.assign(
      {
        success: !this.cancel,
        preactions: this.preactions.reciepts,
        reactions: this.reactions.reciepts,
        messages: this._messages,
      },
      _reciept
    ) as BattleNodeReciept<P, Reciept>;
    this._reciept = reciept;
    return reciept;
  }

  protected abstract doExecute(battle: Battle<P>): Promise<Reciept>;
}

export type BattleNodeReciept<P extends BattleBuilderParams<P>, Extra> =
  | ({
      success: true;
      preactions: ActionReciept<P>[];
      messages: BattleMessage<P>[];
      reactions: ActionReciept<P>[];
    } & Extra)
  | {
      success: false;
      messages: BattleMessage<P>[];
    };

interface BaseRoundReciept<P extends BattleBuilderParams<P>> {
  number: number;
  actions: ActionReciept<P>[];
}
export type RoundReciept<P extends BattleBuilderParams<P>> = BattleNodeReciept<P, BaseRoundReciept<P>>;
export class Round<P extends BattleBuilderParams<P>> extends BattleNode<P, BaseRoundReciept<P>> {
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
      actions: this.actions.reciepts,
    };
  }
}

interface BaseActionReciept<P extends BattleBuilderParams<P>> {
  targetEffects: Partial<TargetEffectsReciept<P>>[];
  sourceEffects: Partial<SourceEffectsReciept<P>>;
  battleEffects: Partial<BattleEffectsReciept<P>>;
}
export type ActionReciept<P extends BattleBuilderParams<P>> = BattleNodeReciept<P, BaseActionReciept<P>>;

export class Action<P extends BattleBuilderParams<P>> extends BattleNode<P, BaseActionReciept<P>> {
  constructor(public params: ActionParams<P>) {
    super();
  }

  public doExecute() {
    const { targets } = this.params;
    // let [applyRecoil, applyCrash] = [false, false];
    const reciepts: Partial<TargetEffectsReciept<P>>[] = [];
    for (const target of targets) {
      // this is ... not great
      const battleType = this.params.battle.type;
      const capitalizedBattleType = (battleType[0].toUpperCase() + battleType.slice(1)) as Capitalize<P["name"]>;
      const receiver = target[`receive${capitalizedBattleType}TargetEffects`] as (
        group: TargetEffects<P>,
        context: GroupContext<P, "target">
      ) => Partial<TargetEffectsReciept<P>> | null;
      const reciept = receiver.apply(target, [
        this.params.effect,
        {
          action: this,
          target,
          source: this.params.source,
          battle: this.params.battle,
        },
      ]) as TargetEffectsReciept<P>;
      if (reciept) {
        reciepts.push(reciept);
        if (reciept.remove) this.params.battle.removeCombatant(target);
      }

      // if (reciept) applyRecoil = true;
      // if (!reciept) applyCrash = true;

      // TODO this is weirder than I thought
      // const recoilEffect = decide(this.params.effect.recoil ?? undefined, { action: this, combatant: user });
      // if (applyRecoil && recoilEffect) this.addReaction(recoil(user, recoilEffect));

      // const crashEffect = decide(this.params.effect.crash ?? undefined, { action: this, combatant: user });
      // if (applyCrash && crashEffect) this.addReaction(recoil(user, crashEffect));
    }
    return Promise.resolve({
      targetEffects: reciepts,
      sourceEffects: [] as SourceEffectsReciept<P>,
      battleEffects: [] as BattleEffectsReciept<P>,
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
