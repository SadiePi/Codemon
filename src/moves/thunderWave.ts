import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const ThunderWave: Move = dexBuilder.register<Move>(() => ({
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
