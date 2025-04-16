import { Stat, LevelUpReceipt, AddExpReceipt } from "./stats.ts";

// deno-lint-ignore ban-types
export type MoveEvents = {};

export type StatEvents = {
  stageChange: [stat: Stat, old: number, current: number];
  stageReset: [stat: Stat, old: number];
  levelUp: [receipt: LevelUpReceipt];
  addExp: [receipt: AddExpReceipt];
};