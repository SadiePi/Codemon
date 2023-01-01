import { Codex, Move } from "../index.ts";
import preload from "../preload.ts";

export const Sharpen: Move = preload.register<Move>((C: Codex) => ({
  name: "Sharpen",
  description: "The user makes its edges more jagged, which raises its Attack stat.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 30,
  makesContact: false,
  stages: { attack: 1 },
}));
