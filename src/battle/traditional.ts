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

export type AttackReciept = TargetEffectsReciept["attack"];
export type HPReciept = TargetEffectsReciept["hp"];

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

export default class TraditionalBattle extends EventEmitter<BattleEvents> implements Battle {
  private combatants: Combatant[];

  async runBattle() {
    return {} as BattleReciept;
  }

  constructor(combatants: Combatant[]) {
    super();
    this.combatants = combatants;
  }

  getRound(): Round {
    return {} as Round;
  }

  async runRound(): Promise<RoundReciept> {
    return {} as RoundReciept;
  }

  getActions(): Promise<ActionPlan[]> {
    return Promise.resolve([]);
  }

  getAction(combatant: Combatant): ActionPlan | Promise<ActionPlan> {
    return {} as ActionPlan;
  }

  getTargets(action: ActionSource, combatant: Combatant): TargetChoice | Promise<TargetChoice> {
    return {} as TargetChoice;
  }

  sortActions(plans: ActionPlan[]): ActionPlan[] {
    return plans;
  }

  async runActions(plans: ActionPlan[]): Promise<ActionReciept[]> {
    const reciepts = [];
    for (const plan of plans) reciepts.push(await this.runAction(plan));
    return reciepts;
  }

  async runAction(plan: ActionPlan): Promise<ActionReciept> {
    const action = plan.source.useAction({
      plan,
      battle: this,
    });
    if (!action) return { success: false };
    return action.execute(this);
  }

  receiveWeather(effect: Decider<Weather | undefined, BattleContext>, action: Action) {
    return {} as BattleEffectsReciept["weather"];
  }

  receiveEject(effect: Decider<SingleOrArray<Combatant> | undefined, BattleContext>, action: Action) {
    return {} as BattleEffectsReciept["eject"];
  }

  receiveEnd(effect: Decider<boolean | undefined, BattleContext>, action: Action) {
    return {} as BattleEffectsReciept["end"];
  }

  receiveEffects(effects: BattleEffects, action: Action) {
    return null;
  }
}

// export function decideTargetEffects(
//   params: EffectParams<TargetEffects>,
//   context: TargetContext
// ): Partial<EffectGroupEffects<TargetEffects> & { accuracy: number | boolean }> {
//   const effects = {} as Partial<EffectGroupEffects<TargetEffects> & { accuracy: number | boolean }>;

//   effects.accuracy = decide(params.accuracy, context);
//   if (effects.accuracy === false) return effects;

//   const attack = decide(params.attack, context);
//   if (attack) effects.attack = attack;
//   const status = decide(params.status, context);
//   if (status) effects.status = status;
//   const hp = decide(params.hp, context);
//   if (hp) effects.hp = hp;
//   const stages = decide(params.stages, context);
//   if (stages) effects.stages = stages;
//   const faint = decide(params.faint, context);
//   if (faint) effects.faint = faint;

//   return effects;
// }

// export function decideSourceEffects(
//   params: EffectParams<SourceEffects>,
//   context: SourceContext
// ): Partial<EffectGroupEffects<SourceEffects>> {
//   const effects = {} as Partial<EffectGroupEffects<SourceEffects>>;

//   const leech = decide(params.leech, context);
//   if (leech) effects.leech = leech;
//   const recoil = decide(params.recoil, context);
//   if (recoil) effects.recoil = recoil;
//   const crash = decide(params.crash, context);
//   if (crash) effects.crash = crash;

//   return effects;
// }

// export function decideBattleEffects(
//   params: EffectParams<BattleEffects>,
//   context: BattleContext
// ): Partial<EffectGroupEffects<BattleEffects>> {
//   const effects = {} as Partial<EffectGroupEffects<BattleEffects>>;

//   const weather = decide(params.weather, context);
//   if (weather) effects.weather = weather;
//   const end = decide(params.end, context);
//   if (end) effects.end = end;

//   return effects;
// }

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
