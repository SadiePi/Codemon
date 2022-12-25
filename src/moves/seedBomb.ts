import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const SeedBomb = moves.register(() => ({
  name: "Seed Bomb",
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  target: "Any Adjacent",
  makesContact: false,
}));
