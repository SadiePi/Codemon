import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const SeedBomb: Move = dexBuilder.register<Move>(() => ({
  name: "Seed Bomb",
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  target: "Any Adjacent",
  makesContact: false,
}));
