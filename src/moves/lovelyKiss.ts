import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const LovelyKiss: Move = dexBuilder.register<Move>(() => ({
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
