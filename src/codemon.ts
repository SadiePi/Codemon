import {
  Combatant,
  Battle,
  Attack,
  EffectReciept,
  Action,
  TargetContext,
  BattleMessage,
  Effects,
  TargetEffects,
  TargetEffectsReciept,
  SourceEffects,
  SourceEffectsReciept,
  ActionPlan,
} from "./battle.ts";
import { config } from "./config.ts";
import { Decider, decide, MultiDecider, choose } from "./decision.ts";
import { Item } from "./item.ts";
import { SpawnContext } from "./map.ts";
import { Move, MoveEntry } from "./move.ts";
import {
  ExperienceGroup,
  BaseStats,
  EVYields,
  Stat,
  Nature,
  IStatSet,
  StatSet,
  getRandomNature,
  StageMods,
} from "./stats.ts";
import { Weather, Ability, StatusEffect } from "./status.ts";
import { Trainer } from "./trainer.ts";
import { NonEmptyPartial, NonEmptyArray, SingleOrArray, TODO } from "./util.ts";
import { fmt } from "./external.ts";

export interface Learnset {
  [level: number]: Move[];
  machine?: Move[];
  evolution?: Move[];
  breeding?: [Species[], Move][];
  tutoring?: Move[];
}

export type BodyType =
  | "Head"
  | "Head and legs"
  | "Head and arms"
  | "Head and base"
  | "Tailed Bipedal"
  | "Tailless Bipedal"
  | "Quadruped"
  | "Multipedal"
  | "Winged"
  | "Many-winged"
  | "Multiple bodies"
  | "Serpentine"
  | "Insectoid"
  | "Finned";

export interface Type {
  name: string;
  color: string; // TODO move to a palette file
  weaknesses: Type[];
  resistances: Type[];
  immunities: Type[];
}

export interface TypePushTargets {
  weakness?: Type[];
  resistance?: Type[];
  immunity?: Type[];
}

export function addTypeRelation(targets: TypePushTargets, ...types: Type[]) {
  targets.weakness?.forEach(target => target.weaknesses.push(...types));
  targets.resistance?.forEach(target => target.resistances.push(...types));
  targets.immunity?.forEach(target => target.immunities.push(...types));
}

export interface Gender {
  //symbol: Image;
  name: string;
  pronouns: {
    subject: string;
    object: string;
    possessive: string;
  };
}

type InternalEvoReasons = {
  level: number;
  happiness: number;
  move: Move | Move[];
  moveType: Type | Type[];
  gender: Gender;
};

type ExternalEvoReasons = {
  item: Item;
  time: string;
  location: string;
  weather: Weather;
  trade: boolean;
  party: Species | Species[];
  partyType: Type | Type[];
};

type EvoReasons = InternalEvoReasons & ExternalEvoReasons;

export type Evolution = { species: Species } & NonEmptyPartial<EvoReasons>;

export interface Species {
  // Normal species definition information
  name: string;
  description: string;
  //graphics: Graphics
  types: NonEmptyArray<Type>;
  abilities: {
    normal: NonEmptyArray<Ability>;
    hidden?: Ability;
  };
  genders: Decider<Gender, Codemon>;
  catchRate: number;
  eggCycles: number;
  height: number;
  weight: number;
  baseExperienceYield: number;
  experienceGroup: ExperienceGroup;
  bodyType: BodyType;
  //footprint: Footprint
  //CodexColor: CodexColor
  baseFriendship: number;
  baseStats: BaseStats;
  evYields: EVYields;
  learnset: Learnset;
  evolutions: Evolution[];

  // Calculation overrides
  overrideName?: (self: Codemon, inputName: string) => string;
  overrideSex?: (self: Codemon, inputSex: Gender) => Gender;
  overrideStatValue?: (self: Codemon, stat: Stat, inputStat: number, considerBattleStatus: boolean) => number; // TODO use this
  overrideNature?: (self: Codemon, inputNature: Nature) => Nature;
}

// since i'm allowing more than 2 abilities per species,
// i'm defining that when the ability is a number, it
// selects the ability at index (abilitySlot%abilitiesCount)
type AbilitySelector = number | "hidden" | Ability;

export type SpawnParams = MultiDecider<
  {
    species: Species;
    name?: string;
    gender?: Gender;
    nature?: Nature;
    stats?: IStatSet;
    moves?: Record<number, Move>;
    ability?: AbilitySelector;
    trainer?: Trainer;
  },
  SpawnContext
>;

export function spawn(from: Decider<SpawnParams>): Codemon {
  return new Codemon(decide(from, undefined));
}

// TODO: https://bulbapedia.bulbagarden.net/wiki/Affection
export class Codemon implements Combatant {
  public species: Species;
  public moves: MoveEntry[];
  public stats: StatSet;
  public trainer: Trainer;

  constructor(
    options: SpawnParams,
    context: SpawnContext = {
      type: "Other",
    }
  ) {
    // TODO enforce sane values
    this.species = decide(options.species, context);
    this.moves = [];
    // // creating experience object automatically populates moves
    // if (options.moves)
    //   for (const [slot, move] of Object.entries(options.moves))
    //     this.moves[parseInt(slot)] = new MoveEntry({ user: this, move: move });
    this.name = decide(options.name, context) ?? this.species.name;
    this.gender = decide(options.gender, context) ?? decide(this.species.genders, this);
    this._originalAbility = this._ability =
      decide(options.ability, context) ?? decide(choose(this.species.abilities.normal.length), null);
    this._originalNature = this._nature = decide(options.nature, context) ?? getRandomNature(options);
    this.trainer = decide(options.trainer, context) ?? { strategy: config.wild };

    this.stats = new StatSet(this, { ...options.stats });
  }

  // abilities
  private _originalAbility: AbilitySelector;
  private _ability: AbilitySelector;
  public get ability(): Ability {
    if (this._ability === "hidden") return this.species.abilities.hidden ?? this.species.abilities.normal[0];
    if (typeof this._ability === "number")
      return this.species.abilities.normal[this._ability % this.species.abilities.normal.length];
    return this._ability;
  }
  public set ability(ability: AbilitySelector) {
    this._ability = ability;
  }
  public get originalAbility() {
    return this._originalAbility;
  }
  public setOriginalAbility(ability: AbilitySelector, reset = true) {
    if (this._ability === this._originalAbility) this._ability = ability;
    this._originalAbility = ability;
    if (reset) this.resetAbility();
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
    return this.species.overrideName?.(this, this._name) ?? this._name;
  }
  public set name(name: string) {
    name = name ?? this.species.name;
    this._name = this.species.overrideName?.(this, name) ?? name;
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
    return this.species.overrideSex?.(this, this._gender) ?? this._gender;
  }
  public set gender(gender: Gender) {
    this._gender = this.species.overrideSex?.(this, gender) ?? gender;
  }

  public calculateTypeMultiplier(attackType: Type) {
    let boost = 1;
    this.species.types.forEach(type => {
      if (type.immunities.includes(attackType)) boost *= 0;
      else if (type.resistances.includes(attackType)) boost /= 2;
      else if (type.weaknesses.includes(attackType)) boost *= 2;
    });
    return boost;
  }

  public getAction(battle: Battle): ActionPlan {
    const action = decide(this.trainer.strategy.chooseAction, { combatant: this, battle });
    const choice = battle.getTargets(action, this);
    const targets = decide(this.trainer.strategy.chooseTarget, { action, combatant: this, choice, battle });
    return { source: action, targets, combatant: this };
  }

  public receiveEffects(
    effects: Partial<Effects<TargetEffects & SourceEffects>>,
    action: Action
  ): TargetEffectsReciept & SourceEffectsReciept {
    const reciept: TargetEffectsReciept = {};

    if (effects.attack) reciept.attack = this.receiveAttack(effects.attack, action);
    if (effects.hp) reciept.hp = this.receiveHp(effects.hp, action);
    if (effects.status) reciept.status = this.receiveStatus(effects.status, action);
    if (effects.stages) reciept.stages = this.receiveStages(effects.stages, action);
    if (effects.faint) reciept.faint = this.receiveFaint(effects.faint, action);

    return reciept;
  }

  public receiveAttack(effect: Decider<Attack | undefined, TargetContext>, action: Action): EffectReciept["attack"] {
    const attack = decide(effect, { action, user: action.params.user, target: this });
    if (!attack) return { success: false, messages: [], typeMultiplier: 1, total: 0, faint: false };

    const messages: BattleMessage[] = [];

    let base = (2 * attack.level) / 5 + 2;
    base *= attack.power; // TODO apply effective power, not base
    // TODO fix this
    base *= attack.stat;
    const defense = attack.category === "Physical" ? this.stats.defense : this.stats.specialDefense;
    base /= defense.value(true);
    base = base / 50 + 2;

    const typeMultiplier = this.calculateTypeMultiplier(attack.type);
    if (typeMultiplier === 0) messages.push(`It's ${fmt.red("ineffective!")}`);
    else if (typeMultiplier < 1) messages.push(`It's ${fmt.yellow("not very effective...")}`);
    else if (typeMultiplier > 1) messages.push(`It's ${fmt.green("super effective!")}`);

    const product =
      base *
      typeMultiplier *
      (attack.critical ?? 1) *
      (attack.random ?? 1) *
      (attack.stab ?? 1) *
      (attack.item ?? 1) *
      (attack.multitarget ?? 1) *
      (attack.other ?? 1) *
      (attack.weather ?? 1);

    const total = Math.floor(
      config.codemon.limitDamageToRemainingHP ? Math.min(product, this.stats.hp.current) : product
    );

    this.stats.hp.current -= total;
    messages.push(`${this.name} took ${fmt.red(total + "")} damage!`);
    const faint = this.stats.hp.current <= 0;

    if (faint) {
      messages.push(fmt.red(`${this.name} fainted!`));
    } else {
      let remaining = this.stats.hp.current + "";
      if (this.stats.hp.current < this.stats.hp.max * 0.2) remaining = fmt.red(remaining);
      else if (this.stats.hp.current < this.stats.hp.max * 0.5) remaining = fmt.yellow(remaining);
      else if (this.stats.hp.current < this.stats.hp.max * 0.9) remaining = fmt.green(remaining);
      else remaining = fmt.blue(remaining);

      messages.push(
        `${this.name} has ${remaining}/${this.stats.hp.max} HP left!${this.stats.hp.percent < 0.25 ? "!!" : ""}`
      );
    }

    return {
      actual: attack,
      success: true,
      messages,
      typeMultiplier,
      total,
      faint,
    };
  }

  public receiveStatus(
    effect: Decider<SingleOrArray<StatusEffect> | undefined, TargetContext>,
    action: Action
  ): EffectReciept["status"] {
    const status = decide(effect, { action, user: action.params.user, target: this });
    if (!status) return { success: false, messages: [] };

    const messages: BattleMessage[] = [];
    [status].flat().forEach(status => {
      messages.push(TODO("actually recieve status", "warn"));
      messages.push(`${this.name} recieved status ${status.name}!`);
    });

    return { success: true, messages, actual: status };
  }

  public receiveHp(effect: Decider<number | undefined, TargetContext>, action: Action): EffectReciept["hp"] {
    const hp = decide(effect, { action, user: action.params.user, target: this });
    if (!hp) return { success: false, messages: [], faint: false };

    const messages: BattleMessage[] = [];
    const old = this.stats.hp.current;
    this.stats.hp.current = Math.max(0, Math.min(this.stats.hp.max, this.stats.hp.current + hp));
    const diff = this.stats.hp.current - old;
    if (diff > 0) messages.push(`${this.name} healed ${fmt.green(diff + "")} HP!`);
    else if (diff < 0) messages.push(`${this.name} took ${fmt.red(diff + "")} damage!`);
    else messages.push(`${this.name} didn't feel any different!`);

    const faint = this.stats.hp.current <= 0;
    if (faint) messages.push(fmt.red(`${this.name} fainted!`));

    return { success: true, messages, actual: hp, faint };
  }

  public receiveStages(
    effect: Decider<Partial<StageMods> | undefined, TargetContext>,
    action: Action
  ): EffectReciept["stages"] {
    const stages = decide(effect, { action, user: action.params.user, target: this });
    if (!stages) return { success: false, messages: [] };

    const messages: BattleMessage[] = [];
    messages.push(TODO("actually recieve stages", "warn"));
    messages.push(`${this.name} recieved stages ${JSON.stringify(stages)}!`);

    return { success: true, messages, actual: stages };
  }

  public receiveFaint(effect: Decider<boolean | undefined, TargetContext>, action: Action): EffectReciept["faint"] {
    const faint = decide(effect, { action, user: action.params.user, target: this });
    if (!faint) return { success: false, messages: [] };

    this.stats.hp.current = 0;
    return { success: true, messages: [fmt.red(`${this.name} fainted!`)], actual: true };
  }

  public mutate(mutations: Partial<Species>) {
    this.species = { ...this.species, name: `Mutated ${this.species.name}`, ...mutations }; // TODO fix duplicate "mutated" in name
  }

  public evolve(evo: Evolution) {
    // TODO double check evolution requirements
    // TODO retain mutations
    if (this.name === this.species.name) this.name = evo.species.name;
    this.species = evo.species;
  }

  public getDesiredEvolutions(reasons?: Partial<ExternalEvoReasons>): Evolution[] {
    return this.species.evolutions.filter(option => {
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

  public toString(short = false) {
    if (short) return this.name + ` (${this.stats.hp.current}/${this.stats.hp.value()})`;

    const identity = `${this.name !== this.species.name ? `${this.name}: ` : ""}${this.nature.name}, ${
      this.gender.name
    } ${this.species.name}${this.name === this.species.name ? "" : " named " + this.name}`;

    const stats = this.stats.toString().replace("\n", "\n\t");

    const moves = this.moves.map((m, i) => i + 1 + ". " + m.toString()).join("\n");

    return `${identity}\n\t${stats}\n\t${moves}`;
  }
}
