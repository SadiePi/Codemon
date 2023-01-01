import { Codex, dexBuilder, power, Move } from "../index.ts";

export const LovelyKiss: Move = dexBuilder.register<Move>((C: Codex) => ({
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
