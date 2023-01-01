import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const SwordsDance: Move = dexBuilder.register<Move>(() => ({
  name: "Swords Dance",
  description: "A frenetic dance to uplift the fighting spirit. This sharply raises the user's Attack stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Self",
  makesContact: false,
  stages: { attack: 2 },
}));
