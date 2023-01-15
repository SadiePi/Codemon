import { Codex, power, Move, register } from "../index.ts";

export const Glare: Move = register<Move>((C: Codex) => ({
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
