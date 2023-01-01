import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const WaterGun: Move = preload.register<Move>((C: Codex) => ({
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: C.Types.Water,
  category: "Special",
  pp: 25,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
}));
