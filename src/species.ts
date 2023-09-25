import { Item } from "./item.ts";
import {
  BaseStats,
  Codemon,
  Decider,
  EVYields,
  ExperienceGroup,
  Nature,
  NonEmptyArray,
  NonEmptyPartial,
  Stat,
  Status,
  Weather,
} from "./mod.ts";
import { Move } from "./move.ts";

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
    pluralSubject?: boolean;
    object: string;
    possessive: string;
  };
}

export type InternalEvoReasons = {
  level: number;
  happiness: number;
  move: Move | Move[];
  moveType: Type | Type[];
  gender: Gender;
};

export type ExternalEvoReasons = {
  item: Item;
  time: string;
  location: string;
  weather: Weather;
  trade: boolean;
  party: Species | Species[];
  partyType: Type | Type[];
};

export type EvoReasons = InternalEvoReasons & ExternalEvoReasons;

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
  // TODO I think: do this somehow else
  overrideName?: (self: Codemon, inputName: string) => string;
  overrideSex?: (self: Codemon, inputSex: Gender) => Gender;
  overrideStatValue?: (self: Codemon, stat: Stat, inputStat: number, considerBattleStatus: boolean) => number; // TODO use this
  overrideNature?: (self: Codemon, inputNature: Nature) => Nature;
}

// since i'm allowing more than 2 abilities per species,
// i'm defining that when the ability is a number, it
// selects the ability at index (abilitySlot%abilitiesCount)
export type AbilitySelector = number | "hidden" | Ability;
export type Ability = Status<{ self: Codemon }>;
