import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const SeedBomb: Move = preload.register<Move>((C: Codex) => ({
  name: "Seed Bomb",
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  target: "Any Adjacent",
  makesContact: false,
}));
