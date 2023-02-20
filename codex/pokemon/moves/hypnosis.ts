import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const Hypnosis: Move = loader.register<Move>(P => ({
  name: "Hypnosis",
  description: "The user employs hypnotic suggestion to make the target fall into a deep sleep.",
  type: P.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  accuracy: 60,
  target: "Any Adjacent",
  makesContact: false,
  status: P.Statuses.Sleep,
}));
