// temporarily...
// deno-lint-ignore-file no-empty-interface
interface Item {
  name: string;
  description: string;
  price: number;
  isKeyItem: boolean;
  // graphics: Graphics;
}

interface EscapeItem extends Item {}
interface EvolutionItem extends Item {}
// EvoItemModes
interface FossilItem extends Item {}

interface Ball extends Item {
  //catchRate: (battle, target, source) => number;
}

export type Inventory = Item[];
