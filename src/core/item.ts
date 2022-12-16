// temporarily...
export interface ItemType {
  name: string;
  description: string;
  price: number;
  isKeyItem: boolean;
  // graphics: Graphics;
  // escape?: EscapeInfo;
  // ball?: BallInfo
  // fossil?: FossilInfo;
}

export interface Item {
  type: ItemType;
  count: number;
}

export type Inventory = Item[];
