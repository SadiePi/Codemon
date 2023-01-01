import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const WaterGun: Move = dexBuilder.register<Move>(() => ({
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: C.Types.Water,
  category: "Special",
  pp: 25,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
}));
