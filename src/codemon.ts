import {
  Attack,
  BaseStats,
  Battle,
  Combatant,
  config,
  decide,
  Decider,
  EffectContext,
  EffectReciept,
  EVYields,
  ExperienceGroup,
  getRandomNature,
  IStatSet,
  Item,
  Move,
  MoveEntry,
  Nature,
  ReadyAction,
  Stat,
  StatSet,
  StatusEffect,
  Trainer,
  Weather,
  StageMods,
  NonEmptyArray,
  NonEmptyPartial,
  weightedRandom,
  Mutable,
  SingleOrArray,
} from "./mod.ts";

export interface Ability {
  name: string;
  description: string;
  apply: (self: Codemon, battle: Battle) => void | (() => void);
  // TODO apply to map
}

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

export interface ICodemon {
  species: Species;
  name?: string;
  gender?: Gender;
  nature?: Nature;
  stats?: IStatSet;
  moves?: Record<number, Move>;
  ability?: AbilitySelector;
  trainer?: Trainer;
}

export function spawn(from: Decider<ICodemon>): Codemon {
  return new Codemon(decide(from, undefined));
}

// TODO: https://bulbapedia.bulbagarden.net/wiki/Affection
export class Codemon implements Combatant {
  public species: Species;
  public moves: MoveEntry[];
  public stats: StatSet;
  public trainer: Trainer;

  constructor(options: ICodemon) {
    // TODO enforce sane values
    this.species = options.species;
    this.moves = [];
    // creating experience object automatically populates moves
    if (options.moves)
      for (const [slot, move] of Object.entries(options.moves))
        this.moves[parseInt(slot)] = new MoveEntry({ user: this, move: move });
    this.name = options.name ?? this.species.name;
    this.gender = options.gender ?? decide(this.species.genders, this);
    this._originalAbility = this._ability =
      options.ability ?? Math.floor(Math.random() * options.species.abilities.normal.length);
    this._originalNature = this._nature = options.nature ?? getRandomNature(options);
    this.stats = new StatSet(this, { ...options.stats });
    this.trainer = options.trainer ?? { strategy: config.wild };
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

  public getAction(battle: Battle): ReadyAction {
    const action = decide(this.trainer.strategy.chooseAction, { combatant: this, battle });
    const choice = battle.getTargets(action, this);
    const targets = decide(this.trainer.strategy.chooseTarget, { action, combatant: this, choice, battle });
    return { source: action, targets, combatant: this };
  }

  public recieveEffect(context: EffectContext): EffectReciept {
    const reciept: Mutable<EffectReciept> = { target: this, messages: [] };
    if (context.effect.attack) this.recieveAttack(context.effect.attack, reciept, context);
    if (context.effect.faint) this.recieveFaint(reciept, context);
    if (context.effect.stages) this.recieveStages(context.effect.stages, reciept, context);
    if (context.effect.eject) this.recieveEject(reciept, context);
    if (context.effect.status) this.recieveStatus(context.effect.status, reciept, context);
    // TODO add more effects
    return reciept as EffectReciept;
  }

  public recieveAttack(attack: Attack, reciept: Mutable<EffectReciept>, context: EffectContext) {
    let base = (2 * attack.level) / 5 + 2;
    base *= attack.power; // TODO apply effective power, not base
    // TODO fix this
    base *= attack.stat;
    const defense = attack.category === "Physical" ? this.stats.defense : this.stats.specialDefense;
    base /= defense.value(true);
    base = base / 50 + 2;

    const typeMultiplier = this.calculateTypeMultiplier(attack.type);
    if (typeMultiplier === 0) reciept.messages.push(`It's ineffective!`);
    else if (typeMultiplier < 1) reciept.messages.push(`It's not very effective...`);
    else if (typeMultiplier > 1) reciept.messages.push(`It's super effective!`);

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
    // const total = Math.floor(Math.min(product, this.stats.hp.current));
    const total = Math.floor(
      config.codemon.limitDamageToRemainingHP ? Math.min(product, this.stats.hp.current) : product
    );

    this.recieveHPChange(-total, reciept, context);
    this.stats.hp.current -= total;
    reciept.messages.push(`${this.name} took ${total} damage!`);
    if (this.stats.hp.current <= 0) this.recieveFaint(reciept, context);
    else
      reciept.messages.push(
        `${this.name} has ${this.stats.hp.current}/${this.stats.hp.max} HP left!${
          this.stats.hp.percent < 0.25 ? "!!" : ""
        }`
      );

    reciept.attack = {
      attack,
      total,
      typeMultiplier,
    };
  }

  public recieveFaint(reciept: Mutable<EffectReciept>, _context: EffectContext) {
    this.stats.hp.current = 0;
    reciept.faint = true;
    reciept.messages.push(`${this.name} fainted!`);
  }

  public recieveStages(stages: StageMods, reciept: Mutable<EffectReciept>, _context: EffectContext) {
    reciept.stages = {};
    for (const [stat, stage] of Object.entries<number>(stages)) {
      if (stage === 0) continue;
      const statObj = this.stats[stat as Stat];
      const actual = statObj.stage.modify(stage);
      if (actual !== 0) {
        reciept.messages.push(`${this.name}'s ${statObj.stat} ${stage > 0 ? "rose" : "fell"} by ${actual} stages!`);
        reciept.stages[stat as Stat] = actual;
      }
    }
  }

  public recieveEject(reciept: Mutable<EffectReciept>, _context: EffectContext) {
    reciept.eject = true;
    reciept.messages.push(`${this.name} was ejected!`);
  }

  public recieveStatus(status: SingleOrArray<StatusEffect>, reciept: Mutable<EffectReciept>, context: EffectContext) {
    const flat = [status].flat();
    flat.forEach(status => status.apply(this, reciept, context));
  }

  public recieveHPChange(amount: number, reciept: Mutable<EffectReciept>, _context: EffectContext) {
    const current = this.stats.hp.current;
    this.stats.hp.current = Math.min(this.stats.hp.max, Math.max(0, this.stats.hp.current + amount));
    const change = this.stats.hp.current - current;
    if (change !== 0) reciept.messages.push(`${this.name} ${change > 0 ? "gained" : "lost"} ${Math.abs(change)} HP!`);
    reciept.hp = change;
    if (this.stats.hp.current <= 0) this.recieveFaint(reciept, _context);
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
