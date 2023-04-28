import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Glare: Move = loader.register<Move>(P => ({
  name: "Glare",
  description: "The user intimidates the target with the pattern on its belly to cause paralysis.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 30,
  makesContact: false,
  status: P.Statuses.Paralysis,
}));
// TODO type consideration (hit ghosts)
