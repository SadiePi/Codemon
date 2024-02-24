import { decide, proxy } from "../decision.ts";
import { EventEmitter } from "../external.ts";
import { BattleConditionFactors, Type } from "../mod.ts";
import { Codemon, DamageCategory, Decider, MoveEntry, SingleOrArray, StageMods, config } from "../mod.ts";
import { EVYields } from "../stats.ts";
import { NonEmptyPartial, TODO, sequentialAsync } from "../util.ts";
import { Round } from "./core/action.ts";
import { BattleBuilder, BattleBuilderParams, BattleConditionEntries } from "./core/battle.ts";
import { EffectType } from "./core/effect.ts";

export type TraditionalConditionEntries = BattleConditionEntries<T>;

export interface TraditionalBBP extends BattleBuilderParams<T> {
  readonly name: "traditional";
  message: string; // TODO animations etc
  combatant: Codemon;
  conditions: {
    weather: Weather;
    terrain: Terrain;
  };
  target: {
    attack: TargetEffect<Attack, BaseAttackReceipt>;
    status: TargetEffect<SingleOrArray<StatusEffect>>;
    hp: TargetEffect<number, BaseHPReceipt>;
    stages: TargetEffect<StageMods>;
    faint: TargetEffect<boolean>;
    ball: TargetEffect<number, BaseBallReceipt>;
    reward: TargetEffect<Reward>;
    eject: TargetEffect<boolean>;
    disable: TargetEffect<MoveEntry>;
  };
  source: {
    leech: SourceEffect<number, unknown>; // TODO NEXT
    recoil: SourceEffect<TargetEffects, { receipt: Partial<TargetEffectsReceipt> }>; // on hit
    crash: SourceEffect<TargetEffects, { receipt: Partial<TargetEffectsReceipt> }>; // on miss
    selfInflict: SourceEffect<TargetEffects, { receipt: Partial<TargetEffectsReceipt> }>; // on use
  };
  battle: {
    join: BattleEffect<Combatant>;
    weather: BattleEffect<Weather>;
    terrain: BattleEffect<Terrain>;
    end: BattleEffect<boolean>;
  };
}
type T = TraditionalBBP; // for brevity

export type Attack = {
  /** The level of the user */
  level: number;
  /** The power of the move */
  power: number;
  /** The relavent attack stat of the user */
  stat: number;
  /** The category of the move */
  category: Exclude<DamageCategory, "Status">;
  /** The type of the move */
  type: Type;

  /** Factor from type effectiveness */
  typeEffectiveness?: number;
  /** Factor from critical hit */
  criticalHit?: number;
  /** Factor from held item */
  heldItem?: number;
  /** Factor from Same Type Attack Boost */
  stab?: number;
  /** Factors from battle conditions */
  conditions?: BattleConditionFactors<T>;
  /** Factor from multiple targets */
  multitarget?: number;
  /** Factor from Math.random() */
  random?: number;
  /** Factor from ✨Special✨ */
  other?: number;
};

/** Creates an attack effect Decider based on a power level */
export function power(
  power: number,
  modifier?: (attack: Attack, context: TargetContext) => void
): Decider<Attack, TargetContext> {
  return context => {
    const { source, action } = context;
    if (!(source instanceof MoveEntry)) throw new Error("power() can only be used with moves");

    const { user, effects } = source;
    const { category, type } = effects;

    if (category === "Status") throw new Error("Status moves cannot have an attack effect");
    const relevantStat = {
      Physical: user.stats.attack,
      Special: user.stats.specialAttack,
    }[category];

    const attack = {
      level: user.stats.level,
      power,
      stat: relevantStat.value(true),
      type,

      category,
      critical: source.getCriticalMultiplier(),
      stab: user.getSpecies().types.includes(type) ? config.moves.stabMultiplier : 1,
      multitarget: action.params.targets.length > 1 ? config.moves.multitargetMultiplier : 1,
      random: decide(config.moves.randomMultiplier, undefined),
    };

    return modifier ? proxy(attack, modifier) : attack;
  };
}

export interface BaseAttackReceipt {
  total: number;
  faint: boolean;
}

export interface BaseHPReceipt {
  faint: boolean;
}

export interface BaseBallReceipt {
  caught: boolean;
  shakes: number;
}

export type Weather = BattleCondition;
export type Terrain = BattleCondition;

export type Reward = NonEmptyPartial<{
  money: number;
  EVs: EVYields;
}>; // TODO (req trainers) & { trainer: Trainer }

export type AttackReceipt = TargetEffectsReceipt["attack"];
export type StatusReceipt = TargetEffectsReceipt["status"];
export type HPReceipt = TargetEffectsReceipt["hp"];
export type StagesReceipt = TargetEffectsReceipt["stages"];
export type FaintReceipt = TargetEffectsReceipt["faint"];
export type BallReceipt = TargetEffectsReceipt["ball"];
export type RewardReceipt = TargetEffectsReceipt["reward"];
export type EjectReceipt = TargetEffectsReceipt["eject"];
export type DisableReceipt = TargetEffectsReceipt["disable"];

export type LeechReceipt = SourceEffectsReceipt["leech"];
export type RecoilReceipt = SourceEffectsReceipt["recoil"];
export type CrashReceipt = SourceEffectsReceipt["crash"];
export type SelfInflictReceipt = SourceEffectsReceipt["selfInflict"];

export type JoinReceipt = BattleEffectsReceipt["join"];
export type WeatherReceipt = BattleEffectsReceipt["weather"];
export type TerrainReceipt = BattleEffectsReceipt["terrain"];
export type EndReceipt = BattleEffectsReceipt["end"];

export class TraditionalBattle extends EventEmitter<BattleEvents> implements Battle {
  readonly type = "traditional";
  public conditions = { weather: {} as Weather, terrain: {} as Weather }; // TODO handle this better, default conditions?
  public combatants: Codemon[];
  protected _round = new Round<T>(0);

  constructor(combatants: Combatant[]) {
    super();
    this.combatants = combatants;
  }

  public addCombatant(combatant: Codemon) {
    this.combatants.push(combatant);
  }
  public getCombatants() {
    return this.combatants;
  }
  public removeCombatant(combatant: Codemon) {
    this.combatants = this.combatants.filter(c => c !== combatant);
  }

  public getRound() {
    return this._round;
  }

  public async runRound(): Promise<RoundReceipt> {
    this._round = new Round<T>(this.getRound().number + 1);
    return await this._round.execute(this);
  }

  getTargetChoice(_action: ActionSource, _combatant: Codemon): TargetChoice {
    return TODO("Implement target choice filtering. Defaulting to any single target.", false, {
      count: 1,
      targets: this.combatants,
    });
  }

  sortPlans(plans: ActionPlan[]): ActionPlan[] {
    return plans.sort((a, b) => {
      const aSource = a.source;
      const bSource = b.source;

      // TODO metapriority? (e.g. if aSource is an item, it should go first)

      const aPriority = aSource.priority ?? 0;
      const bPriority = bSource.priority ?? 0;
      // TODO emit prio eval event, allow for changes to priority
      if (aPriority !== bPriority) return bPriority - aPriority;

      const aSpeed = aSource instanceof MoveEntry ? aSource.user.stats.speed.value(true) : 0;
      const bSpeed = bSource instanceof MoveEntry ? bSource.user.stats.speed.value(true) : 0;
      // TODO emit speed eval event, allow for changes to speed
      return bSpeed - aSpeed;
    });
  }

  isOver(): boolean {
    // console.log("checking if battle is over");
    return this.combatants.length <= 1;
  }

  async runBattle(): Promise<BattleReceipt> {
    const rounds = [];
    while (!this.isOver()) {
      const receipt = await this.runRound();
      rounds.push(receipt);
    }
    return {
      rounds,
      remaining: this.combatants,
      messages: [],
    };
  }

  getPlans(): Promise<ActionPlan[]> {
    // TODO more rebust system for getting actions
    return Promise.all(this.combatants.map(c => this.getPlan(c)));
  }

  getPlan(combatant: Combatant): Promise<ActionPlan> {
    return combatant.getTraditionalPlan(this);
  }

  runPlans(plans: ActionPlan[]): Promise<ActionReceipt[]> {
    return sequentialAsync(plans, plan => this.runPlan(plan));
  }

  async runPlan(plan: ActionPlan): Promise<ActionReceipt> {
    const action = plan.source.traditionalAction({ plan, battle: this });
    if (!action)
      return {
        success: false,
        messages: [...decide(config.locale.battle.traditional.plan.failed, { battle: this, plan })],
      };
    await this.wait("action", action);
    return await action.execute(this);
  }

  receiveTraditionalJoin(effect: Decider<Combatant | undefined, BattleContext>, context: BattleContext): JoinReceipt {
    const combatant = decide(effect, context);
    if (!combatant)
      return {
        success: false,
        messages: [],
      };
    this.addCombatant(combatant);
    return {
      success: true,
      messages: [...decide(config.locale.battle.traditional.join, { context, combatant })],
      actual: combatant,
    };
  }

  receiveTraditionalWeather(
    effect: Decider<BattleCondition | undefined, BattleContext>,
    context: BattleContext
  ): WeatherReceipt {
    const weather = decide(effect, context);
    if (!weather)
      return {
        success: false,
        messages: [],
      };
    weather.apply(context);
    return {
      success: true,
      messages: [...decide(config.locale.battle.traditional.weather, { context, weather })],
      actual: weather,
    };
  }

  receiveTraditionalTerrain(
    effect: Decider<BattleCondition | undefined, BattleContext>,
    context: BattleContext
  ): WeatherReceipt {
    const terrain = decide(effect, context);
    if (!terrain)
      return {
        success: false,
        messages: [],
      };
    terrain.apply(context);
    return {
      success: true,
      messages: [...decide(config.locale.battle.traditional.terrain, { context, terrain })],
      actual: terrain,
    };
  }

  receiveTraditionalEnd(effect: Decider<boolean | undefined, BattleContext>, context: BattleContext): EndReceipt {
    const end = decide(effect, context);
    if (!end)
      return {
        success: false,
        messages: [],
      };

    TODO("Implement end of battle");

    return {
      success: true,
      messages: [...decide(config.locale.battle.traditional.end, { context })],
      actual: false,
    };
  }

  receiveTraditionalBattleEffects(effects: BattleEffects, context: BattleContext): BattleEffectsReceipt {
    const receipt = {} as BattleEffectsReceipt;
    if (effects.join) receipt.join = this.receiveTraditionalJoin(effects.join, context);
    if (effects.weather) receipt.weather = this.receiveTraditionalWeather(effects.weather, context);
    if (effects.terrain) receipt.terrain = this.receiveTraditionalTerrain(effects.terrain, context);
    if (effects.end) receipt.end = this.receiveTraditionalEnd(effects.end, context);
    return receipt;
  }
}
export default TraditionalBattle;

// battle builder stuff
// this is just so the library can give the user
// a nice interface for building battle effects

type BB = BattleBuilder<T>;
type TargetEffects = BB["targetEffects"];
type SourceEffects = BB["sourceEffects"];
type BattleEffects = BB["battleEffects"];
type Effects = BB["effects"];
type TargetEffectsReceipt = BB["targetEffectsReceipt"];
type SourceEffectsReceipt = BB["sourceEffectsReceipt"];
type BattleEffectsReceipt = BB["battleEffectsReceipt"];
type EffectsReceipt = BB["effectsReceipt"];
type TargetContext = BB["targetContext"];
type SourceContext = BB["sourceContext"];
type BattleContext = BB["battleContext"];
type Combatant = BB["combatant"];
type TargetChoice = BB["targetChoice"];
type Action = BB["action"];
type ActionPlan = BB["actionPlan"];
type ActionUseContext = BB["actionUseContext"];
type ActionSource = BB["actionSource"];
type ActionReceipt = BB["actionReceipt"];
type RoundReceipt = BB["roundReceipt"];
type Battle = BB["battle"];
type BattleReceipt = BB["battleReceipt"];
type BattleEvents = BB["battleEvents"];
type StatusEffect = BB["statusEffect"];
type BattleCondition = BB["battleCondition"];
type TargetEffect<E, Extra = Record<never, never>> = EffectType<TargetContext, E, T, Extra>;
type SourceEffect<E, Extra = Record<never, never>> = EffectType<SourceContext, E, T, Extra>;
type BattleEffect<E, Extra = Record<never, never>> = EffectType<BattleContext, E, T, Extra>;
