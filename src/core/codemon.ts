import Experience from "./experience.ts";
import { IMoves, Move, MoveReciept, MoveUsage } from "./move.ts";
import { getRandomNature, Nature } from "./nature.ts";
import { Female, Male, Sex } from "./sex.ts";
import { Species } from "./species.ts";
import { IStats, StatSet } from "./stats.ts";

type RangeOrExact = number | [number, number];

export interface ICodemon {
  species: Species;
  name?: string;
  sex?: Sex;
  level?: RangeOrExact;
  nature?: Nature;
  stats?: IStats;
  moves: IMoves; // TODO: default moves from learnset
}

type SpawnBankEntry = [options: ICodemon, weight: number];
export type SpawnBank = [SpawnBankEntry, ...SpawnBankEntry[]];
export function spawn(from: ICodemon | SpawnBank, random?: number): Codemon {
  if (Array.isArray(from)) {
    const totalWeight = from.reduce((acc, entry) => acc + entry[1], 0);
    const randomWeight = (random ?? Math.random()) * totalWeight;
    let weight = 0;
    for (const entry of from) {
      weight += entry[1];
      if (weight >= randomWeight) return new Codemon(entry[0]);
    }
    throw new Error("Spawn failed");
  }
  return new Codemon(from);
}

// TODO: https://bulbapedia.bulbagarden.net/wiki/Affection
export class Codemon {
  public species: Species;
  public experience: Experience;
  public stats: StatSet;
  public moves: Move[];

  constructor(options: ICodemon) {
    // TODO enfore sane values
    this.species = options.species;
    this.name = options.name ?? this.species.name;
    this.sex = options.sex ?? (Math.random() < this.species.sexRatio ? Male : Female);

    this.experience = new Experience({
      group: options.species.experienceGroup,
      level: Array.isArray(options.level)
        ? options.level[0] + Math.floor(Math.random() * (options.level[1] - options.level[0]))
        : options.level,
    });

    this._originalNature = this.temporaryNature = options.nature ?? getRandomNature();

    this.stats = new StatSet({ self: this, ...options.stats });
    this.moves = options.moves?.map(m => new Move({ self: this, info: m })) ?? [];
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

  // Sex
  protected _sex: Sex = { name: "Initialization error" };
  public get sex() {
    return this.species.overrideSex?.(this, this._sex) ?? this._sex;
  }
  public set sex(sex: Sex) {
    this._sex = this.species.overrideSex?.(this, sex) ?? sex;
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

  public RecieveMove(move: MoveUsage): MoveReciept {
    // TODO apply abilities etc to move
    const ret: Partial<MoveReciept> = { usage: move, target: this };
    ret.damage = Math.floor(move.base * move.multitarget * move.critical * move.random * move.stab * move.other);

    this.stats.hp.current -= ret.damage;
    if (this.stats.hp.current <= 0) {
      ret.damage += this.stats.hp.current;
      this.stats.hp.current = 0;
      ret.fainted = true;
    } else ret.fainted = false;

    return ret as MoveReciept;
  }

  public toString(short = false) {
    const identity = `Level ${this.experience.level}, ${this.nature.name}, ${this.sex.name} ${this.species.name}${
      this.name === this.species.name ? "" : " named " + this.name
    }`;
    if (short) return identity + ` (${this.stats.hp.current}/${this.stats.hp.value()})`;

    const stats = this.stats.toString();

    const moves = this.moves.map((m, i) => i + 1 + ". " + m.toString()).join("\n");

    return `--- Codemon ---\n${identity}\n--- Stats ---\n${stats}\n--- Moves ---\n${moves}\n-------------`;
  }
}
export default Codemon;
