import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Smokescreen = moves.register(() => ({
  name: "Smokescreen",
  description: "The user releases an obscuring cloud of smoke or ink. This lowers the target's accuracy.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent",
  makesContact: false,
  stages: { accuracy: -1 },
}));
