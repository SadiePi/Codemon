import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const LeechSeed = moves.register(() => ({
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
