// deno-lint-ignore-file no-unused-vars
import { Battle } from "../battle.ts";
import { EventEmitter } from "../external.ts";
import {
  Action,
  ActionPlan,
  ActionReciept,
  ActionSource,
  BattleBuilder,
  BattleEvents,
  BattleReciept,
  DamageCategory,
  Decider,
  EffectType,
  EffectTypeReciept,
  MoveEntry,
  Round,
  RoundReciept,
  SingleOrArray,
  StageMods,
  StatusEffect,
  TargetChoice,
  Type,
  Weather,
  config,
} from "../mod.ts";

type P = {
  target: TargetEffectsBuilder;
  source: SourceEffectsBuilder;
  battle: BattleEffectsBuilder;
};

export type BB = BattleBuilder<P>;

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

export type AttackReciept = EffectTypeReciept<Attack, BaseAttackReciept>;

export interface HPReciept {
  faint: boolean;
}

export type TargetEffectsBuilder = {
  attack: EffectType<TargetContext, Attack, BaseAttackReciept>;
  status: EffectType<TargetContext, SingleOrArray<StatusEffect>>;
  hp: EffectType<TargetContext, number, HPReciept>;
  stages: EffectType<TargetContext, StageMods>;
  faint: EffectType<TargetContext, boolean>;
};

export type SourceEffectsBuilder = {
  leech: EffectType<SourceContext, number>;
  recoil: EffectType<SourceContext, TargetEffectsBuilder>;
  crash: EffectType<SourceContext, TargetEffectsBuilder>;
};

export type BattleEffectsBuilder = {
  weather: EffectType<BattleContext, Weather>;
  eject: EffectType<BattleContext, SingleOrArray<Combatant>>;
  end: EffectType<BattleContext, boolean>;
};

export type Combatant = BB["combatant"];
export type TargetContext = BB["targetContext"];
export type TargetEffects = BB["targetEffects"];
export type TargetEffectsReciept = BB["targetReciept"];
export type SourceContext = BB["sourceContext"];
export type SourceEffects = BB["sourceEffects"];
export type SourceEffectsReciept = BB["sourceReciept"];
export type BattleContext = BB["battleContext"];
export type BattleEffects = BB["battleEffects"];
export type BattleEffectsReciept = BB["battleReciept"];
export type Effects = TargetEffects & SourceEffects & BattleEffects;
export type EffectsReciept = TargetEffectsReciept & SourceEffectsReciept & BattleEffectsReciept;

export default class TraditionalBattle extends EventEmitter<BattleEvents<P>> implements Battle<P> {
  private combatants: Combatant[];

  async runBattle() {
    return {} as BattleReciept<{
      target: TargetEffectsBuilder;
      source: SourceEffectsBuilder;
      battle: BattleEffectsBuilder;
    }>;
  }

  constructor(combatants: Combatant[]) {
    super();
    this.combatants = combatants;
  }

  getRound(): Round<P> {
    return {} as Round<P>;
  }

  async runRound(): Promise<RoundReciept<P>> {
    return {} as RoundReciept<P>;
  }

  getActions(): Promise<ActionPlan<P>[]> {
    return Promise.resolve([]);
  }

  getAction(combatant: Combatant): ActionPlan<P> | Promise<ActionPlan<P>> {
    return {} as ActionPlan<P>;
  }

  getTargets(action: ActionSource<P>, combatant: Combatant): TargetChoice<P> | Promise<TargetChoice<P>> {
    return {} as TargetChoice<P>;
  }

  sortActions(actions: ActionPlan<P>[]): ActionPlan<P>[] {
    return actions;
  }

  async runActions(actions: ActionPlan<P>[]): Promise<ActionReciept<P>[]> {
    return [];
  }

  async runAction(action: ActionPlan<P>): Promise<ActionReciept<P>> {
    return {} as ActionReciept<P>;
  }

  receiveWeather(effect: Decider<Weather | undefined, BattleContext>, action: Action<P>) {
    return {} as EffectTypeReciept<Weather, Record<never, never>>;
  }

  receiveEject(effect: Decider<SingleOrArray<Combatant> | undefined, BattleContext>, action: Action<P>) {
    return {} as EffectTypeReciept<SingleOrArray<Combatant>, Record<never, never>>;
  }

  receiveEnd(effect: Decider<boolean | undefined, BattleContext>, action: Action<P>) {
    return {} as EffectTypeReciept<boolean, Record<never, never>>;
  }

  receiveEffects(effects: BattleEffects, action: Action<P>) {
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
