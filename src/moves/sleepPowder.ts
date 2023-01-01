import { Codex, dexBuilder, Move } from "../index.ts";

export const SleepPowder: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Sleep Powder",
  description: "The user scatters a big cloud of sleep-inducing dust around the target.",
  type: C.Types.Grass,
  category: "Status",
  pp: 15, // max 24
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Sleep,
}));
