import { Codex, Move } from "../index.ts";
import preload from "../preload.ts";

export const SwordsDance: Move = preload.register<Move>((C: Codex) => ({
  name: "Swords Dance",
  description: "A frenetic dance to uplift the fighting spirit. This sharply raises the user's Attack stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Self",
  makesContact: false,
  stages: { attack: 2 },
}));