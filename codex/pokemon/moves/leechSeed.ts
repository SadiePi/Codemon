import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const LeechSeed: Move = loader.register<Move>(P => ({
  name: "Leech Seed",
  description: "A seed is planted on the target. It steals some HP from the target every turn.",
  type: P.Types.Grass,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: { position: "Adjacent" },
  makesContact: false,
  status: P.Statuses.LeechSeed,
}));
