import { Ability, ReadyAction, EffectReciept, ActionTarget, ActionEffects } from "./battle.ts";
import Experience, { ExperienceGroup, Learnset } from "./experience.ts";
import { MoveEntry, Move } from "./move.ts";
import { BaseStats, EVYields, IStats, Stat, StatSet } from "./stats.ts";
import { Action, Attack, Battle, getRandomNature, Nature } from "./index.ts";
import { RequireAtLeastOne, weightedRandom } from "./util.ts";
import { ItemType } from "./item.ts";

type RangeOrExact = number | [number, number];

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
  types: [Type, ...Type[]];
  abilities: {
    normal: [Ability, ...Ability[]];
    hidden?: Ability;
  };
  genders: [Gender, number][];
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
    RequireAtLeastOne<{
      level?: number;
      happiness?: number;
      item?: ItemType;
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

export interface ICodemon {
  species: Species;
  name?: string;
  gender?: Gender;
  level?: RangeOrExact;
  nature?: Nature;
  stats?: IStats;
  moves?: (Move | undefined)[];
}

type SpawnBankEntry = [options: ICodemon, weight: number];
export type SpawnBank = [SpawnBankEntry, ...SpawnBankEntry[]];
export function spawn(from: ICodemon | SpawnBank): Codemon {
  return Array.isArray(from) ? spawn(weightedRandom(from)) : new Codemon(from);
}

// TODO: https://bulbapedia.bulbagarden.net/wiki/Affection
export class Codemon implements ActionTarget {
  public species: Species;
  public experience: Experience;
  public stats: StatSet;
  public moves: MoveEntry[];

  constructor(options: ICodemon) {
    // TODO enforce sane values
    this.species = options.species;
    this.name = options.name ?? this.species.name;
    this.gender = options.gender ?? weightedRandom(options.species.genders);

    this.moves = [];
    // creating experience object automatically populates moves
    this.experience = new Experience({
      self: this,
      group: options.species.experienceGroup,
      level: Array.isArray(options.level)
        ? options.level[0] + Math.floor(Math.random() * (options.level[1] - options.level[0]))
        : options.level,
    });
    if (options.moves)
      this.moves = options.moves.map((m, s) =>
        m ? new MoveEntry({ info: m, self: this }) : this.moves[s] ?? undefined
      );
    this.stats = new StatSet({ self: this, ...options.stats });
    this._originalNature = this.temporaryNature = options.nature ?? getRandomNature();
  }

  public learnMove(move: Move, slot?: number) {
    if (slot === undefined) {
      slot = Math.floor(Math.random() * 4);
      for (let i = 0; i < 4; i++) {
        if (!this.moves[i]) {
          slot = i;
          break;
        }
      }
    }

    this.moves[slot] = new MoveEntry({ info: move, self: this });
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

  // Stats & Nature
  private _originalNature: Nature;
  public get originalNature() {
    return this.species.overrideNature?.(this, this._originalNature) ?? this._originalNature;
  }
  private temporaryNature: Nature;
  public get nature() {
    return this.species.overrideNature?.(this, this.temporaryNature) ?? this.temporaryNature;
  }
  public set nature(value: Nature) {
    this.temporaryNature = this.species.overrideNature?.(this, value) ?? value;
  }
  public resetNature() {
    this.nature = this.originalNature;
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

  public calculateDamage(attack: Attack) {
    let base = (2 * attack.level) / 5 + 2;
    base *= attack.power; // TODO apply effective power, not base
    // TODO fix this
    base *= attack.stat;
    const defense = attack.category === "Physical" ? this.stats.defense : this.stats.specialDefense;
    base /= defense.value(attack.critical != 1 && defense.stage < 0);
    base = base / 50 + 2;

    return (
      base *
      this.calculateTypeBoost(attack.type) *
      (attack.critical ?? 1) *
      (attack.random ?? 1) *
      (attack.stab ?? 1) *
      (attack.item ?? 1) *
      (attack.multitarget ?? 1) *
      (attack.other ?? 1) *
      (attack.weather ?? 1)
    );
  }
  /*
  const stats: [PermanentStat, PermanentStat] =
      this.data.category === "Physical" ? ["attack", "defense"] : ["specialAttack", "specialDefense"];

    const critical = this.GetCriticalMultiplier();
    const multitarget = targets.length > 1 ? C.codemon.moves.multitargetMultiplier : 1;
    const random = 0.85 + Math.random() * 0.15;
    const stab = this.user.species.types.includes(this.data.type) ? 1.5 : 1;

    let base = (2 * this.user.experience.level) / 5 + 2;
    base *= this.data.power; // TODO apply effective power, not base
    // TODO fix this
    base *= this.user.stats[stats[0]].value(critical != 1 && this.user.stats[stats[0]].stage > 0);
    base /= this.user.stats[stats[1]].value(critical != 1 && this.user.stats[stats[1]].stage < 0);
    base = base / 50 + 2;

    return {
      base,
      critical,
      stab,
      weather: 1,
      multitarget,
      random,
      other: 1,
    };*/

  public recieveAction(effects: ActionEffects, _action: Action, _battle: Battle): EffectReciept {
    const reciept: EffectReciept = { target: this };
    // if (effects.accuracy) { }
    // if (effects.attack) { }
    // if (effects.crash) { }
    // if (effects.eject) { }
    // if (effects.faint) { }
    // if (effects.hp) { }
    // if (effects.leech) { }
    // if (effects.power) { }
    // if (effects.preactions) { }
    // if (effects.reactions) { }
    // if (effects.recoil) { }
    // if (effects.restrict) { }
    // if (effects.stage) { }
    // if (effects.status) { }
    // if (effects.weather) { }

    if (effects.attack) {
      const typeBoost = this.calculateTypeBoost(effects.attack.type);
      const damage = this.calculateDamage(effects.attack);
      reciept.attack = {
        typeBoost,
        total: damage,
      };

      this.stats.hp.current -= damage;
    }

    // TODO ...

    return reciept;
  }

  // public RecieveMove(usage: MoveUsage): MoveReciept {
  //   // TODO apply abilities etc to move

  //   let typeBoost = 1;
  //   this.species.types.forEach(t => {
  //     if (t.immunities.includes(usage.moveData.type)) typeBoost *= 0;
  //     else if (t.resistances.includes(usage.moveData.type)) typeBoost /= 2;
  //     else if (t.weaknesses.includes(usage.moveData.type)) typeBoost *= 2;
  //   });

  //   let damage = usage.damage
  //     ? Math.floor(
  //         usage.damage.base *
  //           usage.damage.multitarget *
  //           usage.damage.critical *
  //           usage.damage.random *
  //           usage.damage.stab *
  //           typeBoost *
  //           usage.damage.other
  //       )
  //     : 0;

  //   this.stats.hp.current -= damage;
  //   if (this.stats.hp.current <= 0) {
  //     damage += this.stats.hp.current;
  //     this.stats.hp.current = 0;
  //   }

  //   function applyEffect(effect: MoveEffect) {
  //     switch (effect.type) {
  //       case "StatMod":
  //         if (effect.accuracy && 100 * Math.random() > effect.accuracy) return;
  //     }
  //   }

  //   if (usage.moveData.effect) {
  //     if (Array.isArray(usage.moveData.effect)) usage.moveData.effect.forEach(applyEffect);
  //     else applyEffect(usage.moveData.effect);
  //   }

  //   // TODO: make this cleaner
  //   // if (move.moveData.stageMods) {
  //   //   ret.stageMods = move.moveData.stageMods;
  //   //   if (move.moveData.stageMods.attack)
  //   //     ret.stageMods.attack = this.stats.attack.modifyStage(move.moveData.stageMods.attack);
  //   //   if (move.moveData.stageMods.defense)
  //   //     ret.stageMods.defense = this.stats.defense.modifyStage(move.moveData.stageMods.defense);
  //   //   if (move.moveData.stageMods.specialAttack)
  //   //     ret.stageMods.specialAttack = this.stats.specialAttack.modifyStage(move.moveData.stageMods.specialAttack);
  //   //   if (move.moveData.stageMods.specialDefense)
  //   //     ret.stageMods.specialDefense = this.stats.specialDefense.modifyStage(move.moveData.stageMods.specialDefense);
  //   //   if (move.moveData.stageMods.speed)
  //   //     ret.stageMods.speed = this.stats.speed.modifyStage(move.moveData.stageMods.speed);
  //   // }
  //   return {
  //     usage,
  //     target: this,
  //     damage,
  //     fainted: this.stats.hp.current <= 0,
  //     typeBoost,
  //   } as MoveReciept;
  // }

  public toString(short = false) {
    const identity = `Level ${this.experience.level}, ${this.nature.name}, ${this.gender.name} ${this.species.name}${
      this.name === this.species.name ? "" : " named " + this.name
    }`;
    if (short) return identity + ` (${this.stats.hp.current}/${this.stats.hp.value()})`;

    const stats = this.stats.toString();

    const moves = this.moves.map((m, i) => i + 1 + ". " + m.toString()).join("\n");

    return `--- Codemon ---\n${identity}\n--- Stats ---\n${stats}\n--- Moves ---\n${moves}\n-------------`;
  }
}
export default ActionTarget;
