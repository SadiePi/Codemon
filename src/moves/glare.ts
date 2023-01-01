import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Glare: Move = dexBuilder.register<Move>(() => ({
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
