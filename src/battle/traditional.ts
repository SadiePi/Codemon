import { decide } from "../decision.ts";
import { EventEmitter } from "../external.ts";
import {
  DamageCategory,
  Decider,
  MoveEntry,
  SingleOrArray,
  StageMods,
  StatusEffect,
  Type,
  Weather,
  config,
} from "../mod.ts";
import { sequentialAsync } from "../util.ts";
import { BattleBuilder, EffectType } from "./core.ts";

export type Traditional = {
  target: TargetEffectsBuilder;
  source: SourceEffectsBuilder;
  battle: BattleEffectsBuilder;
};

type BB = BattleBuilder<Traditional>;
export type TargetEffects = BB["targetEffects"];
export type SourceEffects = BB["sourceEffects"];
export type BattleEffects = BB["battleEffects"];
export type Effects = BB["effects"];
export type TargetEffectsReciept = BB["targetEffectsReciept"];
export type SourceEffectsReciept = BB["sourceEffectsReciept"];
export type BattleEffectsReciept = BB["battleEffectsReciept"];
export type EffectsReciept = BB["effectsReciept"];
export type TargetContext = BB["targetContext"];
export type SourceContext = BB["sourceContext"];
export type BattleContext = BB["battleContext"];
export type Combatant = BB["combatant"];
export type TargetChoice = BB["targetChoice"];
export type Action = BB["action"];
export type ActionPlan = BB["actionPlan"];
export type ActionUseContext = BB["actionUseContext"];
export type ActionSource = BB["actionSource"];
export type ActionReciept = BB["actionReciept"];
export type Round = BB["round"];
export type RoundReciept = BB["roundReciept"];
export type Battle = BB["battle"];
export type BattleReciept = BB["battleReciept"];
export type BattleEvents = BB["battleEvents"];

export interface Attack {
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
  /** Factor from critical hit */
  critical?: number;
  /** Factor from held item */
  item?: number;
  /** Factor from Same Type Attack Boost */
  stab?: number;
  /** Factor from influence of weather */
  weather?: number;
  /** Factor from multiple targets */
  multitarget?: number;
  /** Factor from Math.random() */
  random?: number;
  /** Factor from ✨Special✨ */
  other?: number;
}

export interface BaseAttackReciept {
  typeMultiplier: number;
  total: number;
  faint: boolean;
}

export interface BaseHPReciept {
  faint: boolean;
}

export type TargetEffectsBuilder = {
  attack: EffectType<TargetContext, Attack, BaseAttackReciept>;
  status: EffectType<TargetContext, SingleOrArray<StatusEffect>>;
  hp: EffectType<TargetContext, number, BaseHPReciept>;
  stages: EffectType<TargetContext, StageMods>;
  faint: EffectType<TargetContext, boolean>;
};

export type SourceEffectsBuilder = {
  leech: EffectType<SourceContext, number>;
  recoil: EffectType<SourceContext, Effects>;
  crash: EffectType<SourceContext, TargetEffectsBuilder>;
};

export type BattleEffectsBuilder = {
  weather: EffectType<BattleContext, Weather>;
  eject: EffectType<BattleContext, SingleOrArray<Combatant>>;
  end: EffectType<BattleContext, boolean>;
};

export type AttackReciept = TargetEffectsReciept["attack"];
export type StatusReciept = TargetEffectsReciept["status"];
export type HPReciept = TargetEffectsReciept["hp"];
export type StagesReciept = TargetEffectsReciept["stages"];
export type FaintReciept = TargetEffectsReciept["faint"];

export type LeechReciept = SourceEffectsReciept["leech"];
export type RecoilReciept = SourceEffectsReciept["recoil"];
export type CrashReciept = SourceEffectsReciept["crash"];

export type WeatherReciept = BattleEffectsReciept["weather"];
export type WeatherEffectParam = BattleEffects["weather"];
export type EjectReciept = BattleEffectsReciept["eject"];
export type EndReciept = BattleEffectsReciept["end"];

export default class TraditionalBattle extends EventEmitter<BattleEvents> implements Battle {
  protected combatants: Combatant[];
  protected round: Round = {
    number: 0,
    actions: [],
  };
  // protected conditions: BattleConditions ???

  constructor(combatants: Combatant[]) {
    super();
    this.combatants = combatants;
  }

  getRound(): Round {
    return {} as Round;
  }

  getTargets(action: ActionSource, combatant: Combatant): TargetChoice {
    return {} as TargetChoice;
  }

  sortPlans(plans: ActionPlan[]): ActionPlan[] {
    return plans;
  }

  isOver(): boolean {
    return this.combatants.length <= 1;
  }

  async runBattle(): Promise<BattleReciept> {
    const rounds = [];
    while (!this.isOver()) {
      this.round = {
        number: this.round.number + 1,
        actions: [],
      };
      const reciept = await this.runRound();
      rounds.push(reciept);
    }
    return {
      rounds,
      remaining: this.combatants,
      messages: [],
    };
  }

  async runRound(): Promise<RoundReciept> {
    const plans = await this.getPlans();
    const sortedPlans = this.sortPlans(plans);
    const reciepts = await this.runPlans(sortedPlans);
    return {
      round: this.getRound(),
      actions: reciepts,
    };
  }

  getPlans(): Promise<ActionPlan[]> {
    // TODO more rebust system for getting actions
    return Promise.all(this.combatants.map(c => this.getPlan(c)));
  }

  getPlan(combatant: Combatant): Promise<ActionPlan> {
    return combatant.getAction(this);
  }

  runPlans(plans: ActionPlan[]): Promise<ActionReciept[]> {
    return sequentialAsync(plans, plan => this.runPlan(plan));
  }

  // deno-lint-ignore require-await
  async runPlan(plan: ActionPlan): Promise<ActionReciept> {
    const action = plan.source.useAction({
      plan,
      battle: this,
    });
    if (!action) return { success: false };
    return action.execute(this);
  }

  receiveWeather(effect: Decider<Weather | undefined, BattleContext>, action: Action): WeatherReciept {
    const weather = decide(effect, { action });
    if (!weather)
      return {
        success: false,
        messages: [],
      };
    // TODO handle weather
    return {
      success: true,
      messages: [],
      actual: weather,
    };
  }

  receiveEject(effect: Decider<SingleOrArray<Combatant> | undefined, BattleContext>, action: Action): EjectReciept {
    const targets = decide(effect, { action });
    if (!targets)
      return {
        success: false,
        messages: [],
      };
    // TODO handle eject
    return {
      success: true,
      messages: [],
      actual: targets,
    };
  }

  receiveEnd(effect: Decider<boolean | undefined, BattleContext>, action: Action): EndReciept {
    const end = decide(effect, { action });
    if (!end)
      return {
        success: false,
        messages: [],
      };
    // TODO handle end
    return {
      success: true,
      messages: [],
      actual: end,
    };
  }

  receiveEffects(effects: BattleEffects, action: Action): BattleEffectsReciept {
    const reciept = {} as BattleEffectsReciept;
    if (effects.weather) reciept.weather = this.receiveWeather(effects.weather, action);
    if (effects.eject) reciept.eject = this.receiveEject(effects.eject, action);
    if (effects.end) reciept.end = this.receiveEnd(effects.end, action);
    return reciept;
  }
}

/** A completely normal attack */
export function power(power: number): Decider<Attack, TargetContext> {
  return ({ action }) => {
    if (!(action.params.source instanceof MoveEntry)) throw new Error("power() can only be used with moves");
    const level = action.params.source.user.stats.level;
    const type = action.params.source.effects.type;
    const category = action.params.source.effects.category;
    if (category === "Status") throw new Error("Status moves cannot be used as attacks");
    const stats = action.params.source.user.stats;
    const stat = stats[category === "Physical" ? "attack" : "specialAttack"].value(true);
    const critical = action.params.source.TryCriticalHit() ? action.params.source.GetCriticalMultiplier() : 1;
    const random =
      Math.random() * (config.moves.maxRandomMultiplier - config.moves.minRandomMultiplier) +
      config.moves.minRandomMultiplier;
    const stab = action.params.source.user.species.types.includes(type) ? config.moves.stabMultiplier : 1;
    const multitarget = action.params.targets.length > 1 ? config.moves.multitargetMultiplier : 1;

    return {
      level,
      power,
      stat,
      type,
      category,
      critical,
      stab,
      multitarget,
      weather: 1, // TODO
      random,
      other: 1,
    };
  };
}

export function stab(type: Type): Decider<number, TargetContext> {
  return ({ action }) => {
    if (!(action.params.source instanceof MoveEntry)) throw new Error("stab() can only be used with moves");
    const stab = action.params.source.user.species.types.includes(type) ? config.moves.stabMultiplier : 1;
    return stab;
  };
}
