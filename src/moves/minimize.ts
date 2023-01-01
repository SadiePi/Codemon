import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Minimize: Move = dexBuilder.register<Move>(() => ({
  name: "Minimize",
  description: "The user compresses its body to make itself look smaller, which sharply raises its evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  stages: { evasion: 2 },
  status: C.Statuses.Minimize,
}));
