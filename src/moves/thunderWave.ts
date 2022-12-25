import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const ThunderWave = moves.register(() => ({
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
