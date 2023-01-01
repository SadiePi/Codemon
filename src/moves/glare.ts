import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Glare: Move = preload.register<Move>((C: Codex) => ({
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
