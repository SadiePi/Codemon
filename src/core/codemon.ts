import { Battle } from "./battle.ts";
import Experience from "./experience.ts";
import { Move, MoveData, MoveEffect, MoveReciept, MoveUsage } from "./move.ts";
import { getRandomNature, Nature } from "./nature.ts";
import { Female, Male, Sex } from "./sex.ts";
import { Species } from "./species.ts";
import { IStats, StatSet } from "./stats.ts";

type RangeOrExact = number | [number, number];

export interface ICodemon<B extends Battle = Battle> {
  species: Species<B>;
  name?: string;
  sex?: Sex;
  level?: RangeOrExact;
  nature?: Nature;
  stats?: IStats;
  moves?: (MoveData<B> | undefined)[];
}

type SpawnBankEntry<B extends Battle = Battle> = [options: ICodemon<B>, weight: number];
export type SpawnBank<B extends Battle = Battle> = [SpawnBankEntry<B>, ...SpawnBankEntry<B>[]];
export function spawn<B extends Battle = Battle>(from: ICodemon<B> | SpawnBank<B>, random?: number): Codemon<B> {
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
export class Codemon<B extends Battle = Battle> {
  public species: Species<B>;
  public experience: Experience<B>;
  public stats: StatSet<B>;
  public moves: Move<B>[];

  constructor(options: ICodemon<B>) {
    // TODO enfore sane values
    this.species = options.species;
    this.name = options.name ?? this.species.name;
    this.sex = options.sex ?? (Math.random() < this.species.sexRatio ? Male : Female);

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
      this.moves = options.moves.map((m, s) => (m ? new Move<B>({ info: m, self: this }) : this.moves[s] ?? undefined));
    this.stats = new StatSet({ self: this, ...options.stats });
    this._originalNature = this.temporaryNature = options.nature ?? getRandomNature();
  }

  public LearnMove(move: MoveData<B>, slot?: number) {
    if (slot === undefined) {
      slot = Math.floor(Math.random() * 4);
      for (let i = 0; i < 4; i++) {
        if (!this.moves[i]) {
          slot = i;
          break;
        }
      }
    }

    this.moves[slot] = new Move({ info: move, self: this });
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

  public RecieveMove(usage: MoveUsage<B>): MoveReciept<B> {
    // TODO apply abilities etc to move

    let typeBoost = 1;
    this.species.types.forEach(t => {
      if (t.immunities.includes(usage.moveData.type)) typeBoost *= 0;
      else if (t.resistances.includes(usage.moveData.type)) typeBoost /= 2;
      else if (t.weaknesses.includes(usage.moveData.type)) typeBoost *= 2;
    });

    let damage = usage.damage
      ? Math.floor(
          usage.damage.base *
            usage.damage.multitarget *
            usage.damage.critical *
            usage.damage.random *
            usage.damage.stab *
            typeBoost *
            usage.damage.other
        )
      : 0;

    this.stats.hp.current -= damage;
    if (this.stats.hp.current <= 0) {
      damage += this.stats.hp.current;
      this.stats.hp.current = 0;
    }

    function applyEffect(effect: MoveEffect<B>) {
      switch (effect.type) {
        case "StatMod":
          if (effect.accuracy && 100 * Math.random() > effect.accuracy) return;
      }
    }

    if (usage.moveData.effect) {
      if (Array.isArray(usage.moveData.effect)) usage.moveData.effect.forEach(applyEffect);
      else applyEffect(usage.moveData.effect);
    }

    // TODO: make this cleaner
    // if (move.moveData.stageMods) {
    //   ret.stageMods = move.moveData.stageMods;
    //   if (move.moveData.stageMods.attack)
    //     ret.stageMods.attack = this.stats.attack.modifyStage(move.moveData.stageMods.attack);
    //   if (move.moveData.stageMods.defense)
    //     ret.stageMods.defense = this.stats.defense.modifyStage(move.moveData.stageMods.defense);
    //   if (move.moveData.stageMods.specialAttack)
    //     ret.stageMods.specialAttack = this.stats.specialAttack.modifyStage(move.moveData.stageMods.specialAttack);
    //   if (move.moveData.stageMods.specialDefense)
    //     ret.stageMods.specialDefense = this.stats.specialDefense.modifyStage(move.moveData.stageMods.specialDefense);
    //   if (move.moveData.stageMods.speed)
    //     ret.stageMods.speed = this.stats.speed.modifyStage(move.moveData.stageMods.speed);
    // }
    return {
      usage,
      target: this,
      damage,
      fainted: this.stats.hp.current <= 0,
      typeBoost,
    } as MoveReciept<B>;
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
