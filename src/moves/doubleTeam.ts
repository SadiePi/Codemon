import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const DoubleTeam: Move = dexBuilder.register<Move>(() => ({
  name: "Double Team",
  description: "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 15, // max 24
  target: "Self",
  makesContact: false,
  stages: { evasion: 1 },
}));
