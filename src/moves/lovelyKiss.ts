import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const LovelyKiss = moves.register(() => ({
  name: "Lovely Kiss",
  description:
    "With a scary face, the user tries to force a kiss on the target. If it succeeds, the target falls asleep.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 10,
  accuracy: 75,
  makesContact: false,
  status: C.Statuses.Sleep,
}));
