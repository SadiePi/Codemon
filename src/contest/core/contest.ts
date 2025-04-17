import { EventEmitter } from "../../external.ts";
import { ContestantEvents } from "./events.ts";

type History<Schema extends ContestSchema<Schema>> = {
  prev?: History<Schema>;
  next?: History<Schema>;
  data: Schema["historyData"];
};

export type ContestSchema<Schema extends ContestSchema<Schema>> = {
  name: string;

  contestResult: unknown;
  roundResult: unknown;
  historyData: unknown;

  contestant: Contestant<Schema>;

  effects: Record<string, unknown>;
};

export abstract class Contestant<Schema extends ContestSchema<Schema>>
  extends EventEmitter<ContestantEvents<Schema>> {
  abstract getPlan(contest: TurnBasedContest<Schema>): ActionPlan<Schema>;
}

export abstract class TurnBasedContest<Schema extends ContestSchema<Schema>>
  extends EventEmitter<ContestantEvents<Schema>> {
  public abstract readonly type: Schema["name"];
  public teams: Team<Schema>[];
  public history: History<Schema>;
  constructor(
    ...contestants: [Schema["contestant"], ...Schema["contestant"][]]
  );
  constructor(...teams: [Team<Schema>, ...Team<Schema>[]]);
  constructor(...setup: never[]) {
    super();
    this.teams = Array.isArray(setup[0])
      ? setup as Team<Schema>[]
      : (setup as Schema["contestant"][]).map((c) => [c]);
    this.history = { data: "start" };
  }

  abstract run(): Schema["contestResult"];
  abstract runRound(): Schema["roundResult"];
  abstract runPlan(plan: ActionPlan<Schema>): ActionResult<Schema>;
}

export type Team<Schema extends ContestSchema<Schema>> = Schema["contestant"][];

export type ActionPlan<Schema extends ContestSchema<Schema>> = {
  actionable: Actionable<Schema>;
  targets: Schema["contestant"][];
};
export type ActionResult<Schema extends ContestSchema<Schema>> = {
  plan: ActionPlan<Schema>;
};
export class Action<Schema extends ContestSchema<Schema>> {}
export class Actionable<Schema extends ContestSchema<Schema>> {
  constructor(public owner: Schema["contestant"]) {}
  getAction(): Action<Schema> {
    return new Action();
  }
}
