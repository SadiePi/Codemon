import { ContestSchema, TurnBasedContest } from "./contest.ts";

export type ContestEvents<Schema extends ContestSchema<Schema>> = {
  begin: [];
  end: [];
};

export type ContestantEvents<Schema extends ContestSchema<Schema>> = {
  enterContest: [contest: TurnBasedContest<Schema>];
  exitContest: [contest: TurnBasedContest<Schema>];
};
