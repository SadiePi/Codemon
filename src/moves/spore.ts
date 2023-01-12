import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";

export const Spore: Move = loader.register<Move>((C: Codex) => ({
  name: "Spore",
  description: "The user scatters bursts of spores that induce sleep.",
  type: C.Types.Grass,
  target: "Any Adjacent",
  category: "Status",
  pp: 15,
  makesContact: false,
  status: C.Statuses.Sleep,
}));
// TODO type consideration (miss grass types)
