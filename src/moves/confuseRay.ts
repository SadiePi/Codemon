import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const ConfuseRay: Move = preload.register<Move>((C: Codex) => ({
  name: "Confuse Ray",
  description: "The target is exposed to a sinister ray that triggers confusion.",
  type: C.Types.Ghost,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Confusion,
}));
