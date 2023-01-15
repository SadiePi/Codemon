import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const LovelyKiss: Move = loader.register<Move>(P => ({
  name: "Lovely Kiss",
  description:
    "With a scary face, the user tries to force a kiss on the target. If it succeeds, the target falls asleep.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 10,
  accuracy: 75,
  makesContact: false,
  status: P.Statuses.Sleep,
}));
