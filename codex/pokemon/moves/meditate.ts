import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Meditate: Move = loader.register<Move>(P => ({
  name: "Meditate",
  description: "The user meditates to awaken the power deep within its body and raise its Attack stat.",
  type: P.Types.Psychic,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stages: { attack: 1 },
}));
