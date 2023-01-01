import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const SleepPowder: Move = dexBuilder.register<Move>(() => ({
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
