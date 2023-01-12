import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const Glare: Move = loader.register<Move>((C: Codex) => ({
  name: "Glare",
  description: "The user intimidates the target with the pattern on its belly to cause paralysis.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 30,
  makesContact: false,
  status: C.Statuses.Paralysis,
}));
// TODO type consideration (hit ghosts)
