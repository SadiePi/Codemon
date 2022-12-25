import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Meditate = moves.register(() => ({
  name: "Meditate",
  description: "The user meditates to awaken the power deep within its body and raise its Attack stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stages: { attack: 1 },
}));
