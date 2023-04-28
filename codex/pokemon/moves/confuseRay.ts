import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const ConfuseRay: Move = loader.register<Move>(P => ({
  name: "Confuse Ray",
  description: "The target is exposed to a sinister ray that triggers confusion.",
  type: P.Types.Ghost,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  status: P.Statuses.Confusion,
}));
