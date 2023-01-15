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
