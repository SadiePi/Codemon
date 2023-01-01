import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const LeechSeed: Move = dexBuilder.register<Move>(() => ({
  name: "Leech Seed",
  description: "A seed is planted on the target. It steals some HP from the target every turn.",
  type: C.Types.Grass,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.LeechSeed,
}));
