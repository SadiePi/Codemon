import { Move } from "../index.ts";
import loader from "../loader.ts"

export const SwordsDance: Move = loader.register<Move>(P => ({
  name: "Swords Dance",
  description: "A frenetic dance to uplift the fighting spirit. This sharply raises the user's Attack stat.",
  type: P.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Self",
  makesContact: false,
  stages: { attack: 2 },
}));
