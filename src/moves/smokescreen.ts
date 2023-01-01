import { Codex, Move } from "../index.ts";
import preload from "../preload.ts";

export const Smokescreen: Move = preload.register<Move>((C: Codex) => ({
  name: "Smokescreen",
  description: "The user releases an obscuring cloud of smoke or ink. This lowers the target's accuracy.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent",
  makesContact: false,
  stages: { accuracy: -1 },
}));