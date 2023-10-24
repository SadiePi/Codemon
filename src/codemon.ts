import {
  StagesReciept,
  Attack,
  BallReciept,
  FaintReciept,
  StatusReciept,
  LeechReciept,
  AttackReciept,
  HPReciept,
  RecoilReciept,
  CrashReciept,
  TraditionalBBP as T,
} from "./battle/traditional.ts";
import { config } from "./config.ts";
import { Decider, decide, choose, MultiDecider } from "./decision.ts";
import { SpawnContext } from "./map.ts";
import { Move, MoveEntry } from "./move.ts";
import { Nature, StatSet, getRandomNature, StageMods, Stats, IStatSet } from "./stats.ts";
import { StatusEffect, StatusEntry } from "./status.ts";
import { Trainer } from "./trainer.ts";
import { SingleOrArray, TODO } from "./util.ts";
import { EventEmitter, fmt } from "./external.ts";
import {
  ActionPlan,
  Battle,
  TargetContext,
  SourceContext,
  BattleMessage,
  BaseCombatant,
  TargetEffects,
  SourceEffects,
  TargetEffectsReciept,
  SourceEffectsReciept,
} from "./battle/core/mod.ts";
import { Species, Ability, Gender, Type, Evolution, AbilitySelector, ExternalEvoReasons } from "./species.ts";
import { AbilityEntry, DisableReciept, EjectReciept, Reward, RewardReciept } from "./mod.ts";
import { CombatantEvents } from "./battle/core/events.ts";

export function spawn(from: ICodemon): Codemon {
  return new Codemon(decide(from, undefined));
}

// TODO allow string species with <C extends Codex = Codex>?
export type ICodemon = MultiDecider<
  {
    species: Species;
    name?: string;
    gender?: Gender;
    nature?: Nature;
    stats?: IStatSet;
    moves?: Move[];
    ability?: AbilitySelector;
    trainer?: Trainer<T>;
  },
  SpawnContext
>;

// TODO: https://bulbapedia.bulbagarden.net/wiki/Affection
export class Codemon extends EventEmitter<CombatantEvents<T>> implements BaseCombatant<T> {
  private species: Species;
  private mutations: Partial<Species> = {};
  public getSpecies(includeMutations = true): Species {
    return includeMutations && this.mutations ? { ...this.species, ...this.mutations } : this.species;
  }
  public setSpecies(species: Species, retainMutations = true) {
    this.species = species;
    if (!retainMutations) this.mutations = {};
  }
  public mutate(mutations: Partial<Species>) {
    this.mutations = { name: `Mutated ${this.species.name}`, ...this.mutations, ...mutations };
  }
  public resetSpecies() {
    this.setSpecies(this.species, false);
  }

  public moves: MoveEntry[];
  public stats: StatSet;
  public trainer: Trainer<T>;

  constructor(
    options: ICodemon,
    context: SpawnContext = {
      type: "Other",
    }
  ) {
    super();

    // TODO enforce sane values
    this.species = decide(options.species, context);
    this.name = decide(options.name, context) ?? this.getSpecies().name;
    this.gender = decide(options.gender, context) ?? decide(this.getSpecies().genders, this);
    this.originalAbility = this.ability =
      decide(options.ability, context) ?? decide(choose(this.getSpecies().abilities.normal.length), null);
    this._originalNature = this._nature = decide(options.nature, context) ?? getRandomNature(options);
    this.trainer = decide(options.trainer, context) ?? { traditionalStrategy: config.wild };

    this.stats = new StatSet(this, { ...options.stats }, ss => {
      // Update knowable moves and possible evolutions
      ss.on("levelUp", () => this.checkForEvolutions());
      ss.on("levelUp", () => this.checkForNewMoves());
    });

    if (options.moves) {
      const moves = decide(options.moves, context);
      this.moves = moves?.map(move => new MoveEntry({ user: this, move: move })) ?? [];
    } else {
      // TODO autopopulate moves
      this.moves = [];
    }
  }

  // abilities
  // these are all set in the setters below, which are called in the constructor
  private _originalAbility!: AbilitySelector;
  private _ability!: AbilitySelector;
  private _abilityEntry!: AbilityEntry;

  private resolveAbility(selector: AbilitySelector): Ability {
    if (selector === "hidden") return this.getSpecies().abilities.hidden ?? this.getSpecies().abilities.normal[0];
    if (typeof selector === "number")
      return this.getSpecies().abilities.normal[selector % this.getSpecies().abilities.normal.length];
    return selector;
  }
  public get ability(): Ability {
    return this.resolveAbility(this._ability);
  }
  public set ability(ability: AbilitySelector) {
    this._abilityEntry?.expire();
    this._ability = ability;
    this._abilityEntry = new StatusEntry<{ self: Codemon }>(this.ability, { self: this });
  }
  public get originalAbility() {
    return this.resolveAbility(this._originalAbility);
  }
  public set originalAbility(ability: AbilitySelector) {
    if (this._ability === this._originalAbility) this._ability = ability;
    this._originalAbility = ability;
  }
  public resetAbility() {
    this._ability = this._originalAbility;
  }
  // end abilities

  // nature
  private _originalNature: Nature;
  private _nature: Nature;
  public get nature() {
    return this._nature;
  }
  public set nature(nature: Nature) {
    this._nature = nature;
  }
  public get originalNature() {
    return this._originalNature;
  }
  public setOriginalNature(nature: Nature, reset = true) {
    this._originalNature = nature;
    if (reset) this.resetNature();
  }
  public resetNature() {
    this._nature = this._originalNature;
  }
  // end nature

  public learnMove(move: Move, slot?: number) {
    const entry = new MoveEntry({ move: move, user: this });
    slot = slot ?? this.moves.findIndex(move => move === undefined);
    if (slot === -1) this.moves.push(entry);
    else this.moves[slot] = entry;
    return slot;
  }

  // Name
  protected _name = "[Name uninitialized]";
  public get name() {
    return this.getSpecies().overrideName?.(this, this._name) ?? this._name;
  }
  public set name(name: string) {
    name = name ?? this.getSpecies().name;
    this._name = this.getSpecies().overrideName?.(this, name) ?? name;
  }

  // Gender
  protected _gender: Gender = {
    name: "[Gender uninitialized]",
    pronouns: {
      subject: "it",
      object: "it",
      possessive: "its",
    },
  };
  public get gender() {
    return this.getSpecies().overrideGender?.(this, this._gender) ?? this._gender;
  }
  public set gender(gender: Gender) {
    this._gender = this.getSpecies().overrideGender?.(this, gender) ?? gender;
  }

  public calculateTypeMultiplier(attackType: Type) {
    let boost = 1;
    this.getSpecies().types.forEach(type => {
      if (type.immunities.includes(attackType)) boost *= 0;
      else if (type.resistances.includes(attackType)) boost /= 2;
      else if (type.weaknesses.includes(attackType)) boost *= 2;
    });
    return boost;
  }

  // deno-lint-ignore require-await
  public async getTraditionalPlan(battle: Battle<T>): Promise<ActionPlan<T>> {
    const action = decide(this.trainer.traditionalStrategy.chooseAction, { combatant: this, battle });
    const choice = battle.getTargetChoice(action, this);
    const targets = decide(this.trainer.traditionalStrategy.chooseTarget, { action, combatant: this, choice, battle });
    return { source: action, targets, combatant: this };
  }

  public receiveTraditionalTargetEffects(effects: TargetEffects<T>, context: TargetContext<T>) {
    const reciept: Partial<TargetEffectsReciept<T>> = {};

    // TODO
    // let hit = true;
    // if (typeof effects.accuracy === "boolean") hit = effects.accuracy;
    // else {
    //   const effectAccuracy = effects.accuracy ?? 1;
    //   const sourceAccuracy = combatant instanceof Codemon ? combatant.stats.accuracy.stage.multiplier() : 1;
    //   const targetEvasion = target instanceof Codemon ? target.stats.evasion.stage.multiplier() : 1;
    //   const accuracy = (effectAccuracy * sourceAccuracy) / targetEvasion;
    //   if (Math.random() > accuracy) hit = false;
    // }

    if (effects.attack) reciept.attack = this.receiveTraditionalAttack(effects.attack, context);
    if (effects.hp) reciept.hp = this.receiveTraditionalHp(effects.hp, context);
    if (effects.status) reciept.status = this.receiveTraditionalStatus(effects.status, context);
    if (effects.stages) reciept.stages = this.receiveTraditionalStages(effects.stages, context);
    if (effects.faint) reciept.faint = this.receiveTraditionalFaint(effects.faint, context);
    if (effects.ball) reciept.ball = this.receiveTraditionalBall(effects.ball, context);
    if (effects.eject) reciept.eject = this.receiveTraditionalEject(effects.eject, context);

    if (reciept.attack?.success && reciept.attack.faint) reciept.remove = true;
    if (reciept.hp?.success && reciept.hp.faint) reciept.remove = true;
    return reciept;
  }

  public receiveTraditionalAttack(
    effect: Decider<Attack | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): AttackReciept {
    const attack = decide(effect, context);
    if (!attack) return { success: false, messages: [] };

    const messages: BattleMessage<T>[] = [];

    let base = (2 * attack.level) / 5 + 2;
    base *= attack.power;
    // TODO fix this
    base *= attack.stat;
    const defense = attack.category === "Physical" ? this.stats.defense : this.stats.specialDefense;
    base /= defense.value(true);
    base = base / 50 + 2;

    const typeMultiplier = this.calculateTypeMultiplier(attack.type);
    messages.push(...decide(config.locale.codemon.traditional.attack.effectiveness, { context, typeMultiplier }));

    const product =
      base *
      typeMultiplier *
      (attack.critical ?? 1) *
      (attack.random ?? 1) *
      (attack.stab ?? 1) *
      (attack.item ?? 1) *
      (attack.multitarget ?? 1) *
      (attack.other ?? 1) *
      (attack.conditions?.weather ?? 1) *
      (attack.conditions?.terrain ?? 1);

    const total = Math.floor(
      config.codemon.limitDamageToRemainingHP ? Math.min(product, this.stats.hp.current) : product
    );

    this.stats.hp.current -= total;
    messages.push(...decide(config.locale.codemon.traditional.attack.damage, { context, total }));

    return {
      actual: attack,
      success: true,
      messages,
      typeMultiplier,
      total,
      faint: this.stats.hp.fainted,
    };
  }

  public statuses: StatusEntry<TargetContext<T>>[] = [];
  public receiveTraditionalStatus(
    effect: Decider<SingleOrArray<StatusEffect<T>> | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): StatusReciept {
    const status = decide(effect, context);
    if (!status) return { success: false, messages: [] };

    const messages: BattleMessage<T>[] = [];
    [status].flat().forEach(status => {
      const entry = new StatusEntry(status, context);
      if (entry.expired) return;
      this.statuses.push(entry);
      messages.push(...decide(config.locale.codemon.traditional.status.apply, { context, entry }));
    });

    return { success: true, messages, actual: status };
  }

  public receiveTraditionalHp(
    effect: Decider<number | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): HPReciept {
    const hp = decide(effect, context);
    if (!hp) return { success: false, messages: [] };

    const old = this.stats.hp.current;
    this.stats.hp.current = Math.max(0, Math.min(this.stats.hp.max, this.stats.hp.current + hp));
    const difference = this.stats.hp.current - old;

    const messages = [...decide(config.locale.codemon.traditional.hp, { context, difference })];

    return { success: true, messages, actual: hp, faint: this.stats.hp.fainted };
  }

  public receiveTraditionalStages(
    effect: Decider<StageMods | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): StagesReciept {
    const stages = decide(effect, context);
    if (!stages) return { success: false, messages: [] };

    for (const stat of Stats) if (stages[stat]) this.stats[stat].stage.modify(stages[stat]!);

    const messages = [...decide(config.locale.codemon.traditional.stages, { context, stages })];

    return { success: true, messages, actual: stages };
  }

  public receiveTraditionalFaint(
    effect: Decider<boolean | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): FaintReciept {
    const faint = decide(effect, context);
    if (!faint) return { success: false, messages: [] };

    this.stats.hp.current = 0;
    return { success: true, messages: [fmt.red(`${this.name} fainted!`)], actual: true };
  }

  public receiveTraditionalBall(
    effect: Decider<number | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): BallReciept {
    const maxHP = this.stats.hp.max;
    const currentHP = this.stats.hp.current;
    const darkGrass = 1; // TODO
    const rateModified = this.getSpecies().catchRate; // TODO modifiers, needs research
    const ballBonus = decide(effect, context) ?? 0; // 0 = failure
    const badgePenalty = 1; // TODO obedience
    const bonusLevel = this.stats.level < 13 ? Math.max((36 - 2 * this.stats.level) / 10, 1) : 1;
    // deno-lint-ignore prefer-const
    let bonusStatus = 1; // TODO will be decided in an event later;
    const bonusMisc = 1; // TODO

    const a =
      Math.floor((3 * maxHP - 2 * currentHP) * 4096 * darkGrass * rateModified * ballBonus * badgePenalty) *
      bonusLevel *
      bonusStatus *
      bonusMisc;
    // TODO critical capture

    if (a > 255)
      return {
        success: true,
        actual: ballBonus,
        messages: [...decide(config.locale.codemon.traditional.ball.immediate, { context, a })],
        caught: true,
        shakes: 0,
      };

    const b = 65536 / Math.pow(255 / a, 0.1875);
    for (let check = 0; check < config.battle.traditional.shakeChecks; check++) {
      const rand = Math.floor(65536 * Math.random());
      if (rand >= b) {
        return {
          success: true,
          actual: ballBonus,
          messages: [...decide(config.locale.codemon.traditional.ball.escape, { context, a, b, check })],
          caught: false,
          shakes: check,
        };
      }
    }

    return {
      success: true,
      actual: ballBonus,
      messages: [...decide(config.locale.codemon.traditional.ball.caught, { context, a, b })],
      caught: true,
      shakes: config.battle.traditional.shakeChecks,
    };
  }

  public receiveTraditionalReward(
    effect: Decider<Reward | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): RewardReciept {
    const reward = decide(effect, context);
    if (!reward)
      return {
        success: false,
        messages: [],
      };

    TODO("cache and distribute rewards");

    return {
      success: true,
      messages: [...decide(config.locale.codemon.traditional.reward, { context, reward })],
      actual: reward,
    };
  }

  public receiveTraditionalEject(
    effect: Decider<boolean | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): EjectReciept {
    const eject = decide(effect, context);
    if (!eject)
      return {
        success: false,
        messages: [],
      };

    context.battle.removeCombatant(this);
    // TODO disable status effects etc

    return {
      success: true,
      messages: [...decide(config.locale.codemon.traditional.eject, { context })],
      actual: true,
    };
  }

  public receiveTraditionalDisable(
    effect: Decider<MoveEntry | undefined, TargetContext<T>>,
    context: TargetContext<T>
  ): DisableReciept {
    const disable = decide(effect, context);
    if (!disable)
      return {
        success: false,
        messages: [],
      };

    // TODO disable moves

    return {
      success: true,
      messages: [...decide(config.locale.codemon.traditional.disable, { context, move: disable })],
      actual: disable,
    };
  }

  public receiveTraditionalLeech(
    _effect: Decider<number | undefined, SourceContext<T>>,
    _context: SourceContext<T>
  ): LeechReciept {
    return { success: false, messages: ["Leech not implemented yet!"] };
  }

  public receiveTraditionalSourceEffects(
    _effects: SourceEffects<T>,
    _context: SourceContext<T>
  ): SourceEffectsReciept<T> {
    return {} as SourceEffectsReciept<T>;
  }

  public receiveTraditionalRecoil(
    effect: Decider<TargetEffects<T> | undefined, SourceContext<T>>,
    context: SourceContext<T>
  ): RecoilReciept {
    const effects: TargetEffects<T> | undefined = decide(effect, context);
    if (!effects) return { success: false, messages: [] };

    const reciept = this.receiveTraditionalTargetEffects(effects, {
      source: context.source,
      target: this,
      action: context.action,
      battle: context.battle,
    });
    return {
      success: true,
      messages: [],
      actual: effects,
      reciept,
    };
  }
  public receiveTraditionalCrash(
    effect: Decider<TargetEffects<T> | undefined, SourceContext<T>>,
    context: SourceContext<T>
  ): CrashReciept {
    const effects: TargetEffects<T> | undefined = decide(effect, context);
    if (!effects) return { success: false, messages: [] };

    const reciept = this.receiveTraditionalTargetEffects(effects, {
      source: context.source,
      target: this,
      action: context.action,
      battle: context.battle,
    });
    return {
      success: true,
      messages: [],
      actual: effects,
      reciept,
    };
  }

  public evolve(evo: Evolution) {
    // TODO double check evolution requirements
    if (this.name === this.getSpecies().name) this.name = evo.species.name;
    this.setSpecies(evo.species);
  }

  public getDesiredEvolutions(reasons?: Partial<ExternalEvoReasons>): Evolution[] {
    return this.getSpecies().evolutions.filter(option => {
      if (option.level && this.stats.level < option.level) return false;
      if (option.item && reasons?.item !== option.item) return false;
      if (option.trade && !reasons?.trade) return false;
      // if(option.happiness && this.happiness < option.happiness) return false;
      // if(option.time...)
      // if(option.location...)
      // TODO
      return true;
    });
  }

  public checkForEvolutions(): Evolution[] {
    return TODO("check for evolutions", false, []);
  }

  public checkForNewMoves(): Move[] {
    return TODO("check for new moves", false, []);
  }

  public toString(short = false) {
    if (short) return this.name + ` (${this.stats.hp.current}/${this.stats.hp.value()})`;

    const identity = `${this.name !== this.getSpecies().name ? `${this.name}: ` : ""}${this.nature.name}, ${
      this.gender.name
    } ${this.getSpecies().name}${this.name === this.getSpecies().name ? "" : " named " + this.name}`;

    const stats = this.stats.toString().replace("\n", "\n\t");

    const moves = this.moves.map((m, i) => i + 1 + ". " + m.toString()).join("\n");

    return `${identity}\n\t${stats}\n\t${moves}`;
  }
}
