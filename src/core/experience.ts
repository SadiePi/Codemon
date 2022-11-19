import C from "./config.ts"
import { Codemon } from "./codemon.ts"
import { MoveData } from "./move.ts"
import { Species } from "./species.ts"
import { PermanentStat } from "./stats.ts"
import { Battle } from "./battle.ts"

export type ExperienceGroup = (level: number) => number

export type Learnset<B extends Battle = Battle> = {
  machine?: MoveData<B>[]
  evolution?: MoveData<B>[]
  breeding?: [Species[], MoveData<B>][]
  tutoring?: MoveData<B>[]
  [level: number]: MoveData<B>[]
}

export interface LevelUpReport<B extends Battle = Battle> {
  moves: MoveData<B>[]
  stats?: Record<PermanentStat, number>
}

export interface AddExpReport<B extends Battle = Battle> {
  levelUps: Array<LevelUpReport<B>>
}

interface IExperience<B extends Battle = Battle> {
  group: ExperienceGroup
  self: Codemon<B>
  points?: number
  level?: number
}
export default class Experience<B extends Battle> {
  private self: Codemon<B>
  public group: ExperienceGroup
  public level
  public points

  constructor(args: IExperience<B>) {
    this.group = args.group
    this.self = args.self
    this.points = this.level = 0

    const expify = this.addExp(
      (args.points ?? 0 + (args.level ? this.group(args.level) : 0)) || this.group(C.codemon.stats.defaultLevel)
    )
    expify.levelUps.forEach(levelUp => {
      levelUp.moves.forEach(move => this.self.LearnMove(move))
    })
  }

  public levelUp(): LevelUpReport<B> {
    this.level += 1
    if (this.points < this.group(this.level)) this.points = this.group(this.level)
    return { moves: this.self.species.learnset[this.level] ?? [] }
  }

  public addExp(exp: number): AddExpReport<B> {
    this.points += exp
    const levelUps: LevelUpReport<B>[] = []
    while (this.group(this.level) < this.points) {
      levelUps.push(this.levelUp())
    }
    return { levelUps }
  }
}
