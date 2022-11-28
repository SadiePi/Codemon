import C from "./config.ts";
import { Codemon } from "./codemon.ts";
import { MoveData } from "./move.ts";
import { Species } from "./species.ts";
import { PermanentStat } from "./stats.ts";

export type ExperienceGroup = (level: number) => number;

export type Learnset = {
  machine?: MoveData[];
  evolution?: MoveData[];
  breeding?: [Species[], MoveData][];
  tutoring?: MoveData[];
  [level: number]: MoveData[];
};

export interface LevelUpReport {
  moves: MoveData[];
  stats?: Record<PermanentStat, number>;
}

export interface AddExpReport {
  levelUps: Array<LevelUpReport>;
}

interface IExperience {
  group: ExperienceGroup;
  self: Codemon;
  points?: number;
  level?: number;
}
export default class Experience {
  private self: Codemon;
  public group: ExperienceGroup;
  public level;
  public points;

  constructor(args: IExperience) {
    this.group = args.group;
    this.self = args.self;
    this.points = this.level = 0;

    const expify = this.addExp(
      (args.points ?? 0 + (args.level ? this.group(args.level) : 0)) || this.group(C.codemon.stats.defaultLevel)
    );
    expify.levelUps.forEach(levelUp => {
      levelUp.moves.forEach(move => this.self.LearnMove(move));
    });
  }

  public levelUp(): LevelUpReport {
    this.level += 1;
    if (this.points < this.group(this.level)) this.points = this.group(this.level);
    return { moves: this.self.species.learnset[this.level] ?? [] };
  }

  public addExp(exp: number): AddExpReport {
    this.points += exp;
    const levelUps: LevelUpReport[] = [];
    while (this.group(this.level) < this.points) {
      levelUps.push(this.levelUp());
    }
    return { levelUps };
  }
}
