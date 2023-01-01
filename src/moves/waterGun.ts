import { Codex, dexBuilder, power, Move } from "../index.ts";

export const WaterGun: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: C.Types.Water,
  category: "Special",
  pp: 25,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
}));
