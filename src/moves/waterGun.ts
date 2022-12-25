import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const WaterGun = moves.register(() => ({
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: C.Types.Water,
  category: "Special",
  pp: 25,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
}));
