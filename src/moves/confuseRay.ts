import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const ConfuseRay: Move = loader.register<Move>((C: Codex) => ({
  name: "Confuse Ray",
  description: "The target is exposed to a sinister ray that triggers confusion.",
  type: C.Types.Ghost,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Confusion,
}));
