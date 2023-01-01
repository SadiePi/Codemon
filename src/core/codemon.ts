import { EffectReciept, EffectTarget, EffectContext, AttackReciept } from "./battle.ts";
import { MoveEntry, Move } from "./move.ts";
import { BaseStats, EVYields, ExperienceGroup, IStatSet, Stat, StatSet } from "./stats.ts";
import { Attack, Battle, getRandomNature, Nature } from "./index.ts";
import { Mutable, NonEmptyArray, NonEmptyPartial, weightedRandom } from "./util.ts";
import { Item } from "./item.ts";
import decide, { Decider } from "./decision.ts";

export interface Ability {
  name: string;
  description: string;
  apply: (self: Codemon, battle: Battle) => void | (() => void);
  // TODO apply to map
}

export type Learnset = {
  [level: number]: Move[];
  machine?: Move[];
  evolution?: Move[];
  breeding?: [Species[], Move][];
  tutoring?: Move[];
};

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

export type Type = {
  name: string;
  color: string; // TODO move to a palette file
  weaknesses: Type[];
  resistances: Type[];
  immunities: Type[];
};

export interface Gender {
  //symbol: Image;
  name: string;
  pronouns: {
    subject: string;
    object: string;
    possessive: string;
  };
}

export type Species = {
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
  evolutions: [
    Species,
    NonEmptyPartial<{
      level?: number;
      happiness?: number;
      item?: Item;
      time?: string;
      location?: string;
      trade?: boolean;
      other?: string;
    }>
  ][];

  // Calculation overrides
  overrideName?: (self: Codemon, inputName: string) => string;
  overrideSex?: (self: Codemon, inputSex: Gender) => Gender;
  overrideStatValue?: (self: Codemon, stat: Stat, inputStat: number, considerBattleStatus: boolean) => number; // TODO use this
  overrideNature?: (self: Codemon, inputNature: Nature) => Nature;
};

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
}

type SpawnBankEntry = [options: ICodemon, weight: number];
export type SpawnBank = [SpawnBankEntry, ...SpawnBankEntry[]];
export function spawn(from: ICodemon | SpawnBank): Codemon {
  return Array.isArray(from) ? spawn(weightedRandom(from)) : new Codemon(from);
}

// TODO: https://bulbapedia.bulbagarden.net/wiki/Affection
export class Codemon implements EffectTarget {
  public species: Species;
  public moves: MoveEntry[];
  public stats: StatSet;

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
    this._originalNature = this._nature = options.nature ?? getRandomNature();
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
  }

  // Name
  protected _name = "Initialization error";
  public get name() {
    return this.species.overrideName?.(this, this._name) ?? this._name;
  }
  public set name(name: string) {
    name = name ?? this.species.name;
    this._name = this.species.overrideName?.(this, name) ?? name;
  }

  // Gender
  protected _gender: Gender = {
    name: "Initialization error",
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

  public calculateTypeBoost(attackType: Type) {
    let boost = 1;
    this.species.types.forEach(type => {
      if (type.immunities.includes(attackType)) boost *= 0;
      else if (type.resistances.includes(attackType)) boost /= 2;
      else if (type.weaknesses.includes(attackType)) boost *= 2;
    });
    return boost;
  }

  public recieveAttack(attack: Attack): AttackReciept {
    let base = (2 * attack.level) / 5 + 2;
    base *= attack.power; // TODO apply effective power, not base
    // TODO fix this
    base *= attack.stat;
    const defense = attack.category === "Physical" ? this.stats.defense : this.stats.specialDefense;
    base /= defense.value(true);
    base = base / 50 + 2;

    const typeBoost = this.calculateTypeBoost(attack.type);
    const product =
      base *
      typeBoost *
      (attack.critical ?? 1) *
      (attack.random ?? 1) *
      (attack.stab ?? 1) *
      (attack.item ?? 1) *
      (attack.multitarget ?? 1) *
      (attack.other ?? 1) *
      (attack.weather ?? 1);
    // const total = Math.floor(Math.min(product, this.stats.hp.current));
    const total = Math.floor(product);

    return {
      attack,
      total,
      typeBoost,
    };
  }

  public recieveEffect(context: EffectContext): EffectReciept {
    const reciept: Mutable<EffectReciept> = { target: this, messages: [] };
    // TODO

    if (context.effect.attack) {
      const attack = this.recieveAttack(context.effect.attack);
      this.stats.hp.current -= attack.total;
      reciept.messages.push(`${this.name} took ${attack.total} damage!`);
      if (this.stats.hp.current <= 0) {
        this.stats.hp.current = 0;
        reciept.faint = true;
        reciept.messages.push(`${this.name} fainted!`);
      } else {
        reciept.messages.push(`${this.name} has ${this.stats.hp.current}/${this.stats.hp.max} HP left!`);
      }
      reciept.attack = attack;
    }

    if (context.effect.faint) {
      this.stats.hp.current = 0;
      reciept.faint = true;
      reciept.messages.push(`${this.name} fainted!`);
    }

    if (context.effect.stages) {
      reciept.stages = {};
      for (const [stat, stage] of Object.entries(context.effect.stages)) {
        if (stage === 0) continue;
        const statObj = this.stats[stat as Stat];
        const actual = statObj.stage.modify(stage);
        if (actual !== 0) {
          reciept.messages.push(`${this.name}'s ${statObj.stat} ${stage > 0 ? "rose" : "fell"} by ${actual} stages!`);
          reciept.stages[stat as Stat] = actual;
        }
      }
    }

    return reciept as EffectReciept;
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
