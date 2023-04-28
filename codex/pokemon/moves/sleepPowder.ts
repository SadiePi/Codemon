import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const SleepPowder: Move = loader.register<Move>(P => ({
  name: "Sleep Powder",
  description: "The user scatters a big cloud of sleep-inducing dust around the target.",
  type: P.Types.Grass,
  category: "Status",
  pp: 15, // max 24
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: false,
  status: P.Statuses.Sleep,
}));
