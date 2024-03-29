import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Spore: Move = loader.register<Move>(P => ({
  name: "Spore",
  description: "The user scatters bursts of spores that induce sleep.",
  type: P.Types.Grass,
  target: { position: "Adjacent" },
  category: "Status",
  pp: 15,
  makesContact: false,
  status: P.Statuses.Sleep,
}));
// TODO type consideration (miss grass types)
