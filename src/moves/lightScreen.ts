import { Codex, dexBuilder, power, Move } from "../index.ts";

export const LightScreen: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Light Screen",
  description: "A wondrous wall of light is put up to reduce damage from special attacks for five turns.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  target: "Team",
  makesContact: false,
}));
// TODO te,porary boosts
