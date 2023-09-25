import { TraditionalBBP } from "./battle/traditional.ts";
import { Action, ActionSource, ActionUseContext, BaseEffectSource, TargetingCategory } from "./battle/core/mod.ts";
import { Move } from "./move.ts";

export type Item = {
  name: string;
  description: string;
  price?: number; // default unsellable but droppable
  isKeyItem?: boolean; // default false
  maxStack?: number; // default 1
  // graphics: Graphics;
  // escape?: EscapeInfo;
  // fossil?: FossilInfo;
  machine?: Move;
  action?: BaseEffectSource<TraditionalBBP>;
};

// export interface _IItemEntry {
//   type: Item;
//   count: number;
// }

// export class _ItemEntry implements ActionSource<TraditionalBBP> {
//   public priority = undefined;
//   public target: TargetingCategory<TraditionalBBP>;

//   public type: Item;
//   public count: number;

//   constructor(args: _IItemEntry) {
//     this.type = args.type;
//     this.count = args.count;
//     this.target = this.type.action.target;
//   }

//   traditionalAction(context: ActionUseContext<TraditionalBBP>): Action<TraditionalBBP> | null {
//     const ret = new Action({
//       battle: context.battle,
//       user: context.plan.combatant,
//       effect: this.type.action,
//       source: this,
//       targets: context.plan.targets,
//     });

//     ret.message(`${context.plan.combatant.name} used ${this.type.name}!`);
//     return ret;
//   }
// }

// export type ActionItem = Item & ActionSource<TraditionalBBP>;

// export interface ItemEntryArgs {
//   type: Item;
//   count: number;
//   owner: unknown;
// }

// export class ActionItemEntry implements ItemEntry, ActionSource<TraditionalBBP>, BaseEffectSource<TraditionalBBP> {
//   public priority = undefined;
//   public target: TargetingCategory<TraditionalBBP>;

//   public type: Item;
//   public count: number;

//   constructor(args: _ItemEntry) {
//     this.type = args.type;
//     this.count = args.count;
//     this.target = this.type.target;
//   }

//   traditionalAction(context: ActionUseContext<TraditionalBBP>): Action<TraditionalBBP> | null {
//     const ret = new Action({
//       battle: context.battle,
//       user: context.plan.combatant,
//       effect: this,
//       source: this,
//       targets: context.plan.targets,
//     });

//     ret.message(`${context.plan.combatant.name}'s trained used ${this.type.name}!`);
//     return ret;
//   }
// }

// export type Inventory = ItemEntry[];

// // export type Ball = ActionItem<TraditionalBBP> & {
// //   catchRate: Decider<number, Action<TraditionalBBP>>;
// // };
