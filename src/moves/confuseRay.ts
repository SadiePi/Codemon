import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const ConfuseRay = moves.register(() => ({
  name: "Confuse Ray",
  description: "The target is exposed to a sinister ray that triggers confusion.",
  type: C.Types.Ghost,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Confusion,
}));
