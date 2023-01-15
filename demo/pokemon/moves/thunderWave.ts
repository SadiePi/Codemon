import { Codex, Move, register } from "../index.ts";

export const ThunderWave: Move = register<Move>((C: Codex) => ({
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
