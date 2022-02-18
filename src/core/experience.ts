import C from "./config.ts";

export type ExperienceGroup = (level: number) => number;

// deno-lint-ignore no-empty-interface
export interface LevelUpReport {
  // TODO
}

export interface AddExpReport {
  levelUps: Array<LevelUpReport>;
}

type IExperience = {
  points?: number;
  level?: number;
  group: ExperienceGroup;
};
export default class Experience {
  public group: ExperienceGroup;
  public level;
  public points;

  constructor(args: IExperience) {
    this.group = args.group;
    this.level = args.level ?? 0;
    this.points = args.points ?? 0;

    // apply defaults if not both defined
    if (!this.level && !this.points) this.level = C.codemon.stats.defaultLevel;
    if (!this.points) this.points = this.group(this.level); // TODO: Add random exp
    if (!this.level) while (this.group(this.level) < this.points) this.level++;
  }

  public levelUp(levels = 1) {
    this.level += levels;
    this.points = this.group(this.level);
  }

  public addExp(exp: number): boolean {
    let levelup = false;
    while (exp > this.group(this.level) - this.points) {
      levelup = true;
      this.level += 1;
      exp -= this.group(this.level) - this.points;
      this.points = this.group(this.level);
    }
    this.points += exp;
    return levelup;
  }
}
