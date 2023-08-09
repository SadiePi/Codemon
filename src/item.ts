import { TraditionalBBP } from "./battle/traditional.ts";
import { Action, ActionSource, BattleBuilderParams } from "./battle/core/index.ts";
import { Decider } from "./decision.ts";

export interface Item {
  name: string;
  description: string;
  price: number;
  isKeyItem: boolean;
  // graphics: Graphics;
  // escape?: EscapeInfo;
  // ball?: BallInfo
  // fossil?: FossilInfo;
}

export interface ItemEntry {
  type: Item;
  count: number;
}

export type Inventory = ItemEntry[];

export type ActionItem<P extends BattleBuilderParams<P>> = Item & ActionSource<P>;

export type Ball = ActionItem<TraditionalBBP> & {
  catchRate: Decider<number, Action<TraditionalBBP>>;
};
