import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const ConfuseRay: Move = dexBuilder.register<Move>(() => ({
  name: "Confuse Ray",
  description: "The target is exposed to a sinister ray that triggers confusion.",
  type: C.Types.Ghost,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Confusion,
}));
