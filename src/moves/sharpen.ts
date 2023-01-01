import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Sharpen: Move = dexBuilder.register<Move>(() => ({
  name: "Sharpen",
  description: "The user makes its edges more jagged, which raises its Attack stat.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 30,
  makesContact: false,
  stages: { attack: 1 },
}));
