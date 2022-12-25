import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Constrict = moves.register(() => ({
  name: "Constrict",
  description:
    "The target is attacked with long, creeping tentacles, vines, or the like. This may also lower the target's Speed stat.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 35,
  power: 10,
  makesContact: true,
  stages: [1 / 10, { speed: -1 }],
}));
