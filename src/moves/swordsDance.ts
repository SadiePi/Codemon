import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const SwordsDance = moves.register(() => ({
  name: "Swords Dance",
  description: "A frenetic dance to uplift the fighting spirit. This sharply raises the user's Attack stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Self",
  makesContact: false,
  stages: { attack: 2 },
}));
