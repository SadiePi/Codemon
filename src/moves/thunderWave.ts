import { Codex, Move } from "../index.ts";
import preload from "../preload.ts";

export const ThunderWave: Move = preload.register<Move>((C: Codex) => ({
  name: "Thunder Wave",
  description: "The user launches a weak jolt of electricity that paralyzes the target.",
  type: C.Types.Electric,
  category: "Status",
  pp: 20, // max 32
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Paralysis,
}));
