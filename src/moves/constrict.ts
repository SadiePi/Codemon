import { Codex, power, Move, chance } from "../index.ts";
import loader from "../loader.ts";

export const Constrict: Move = loader.register<Move>((C: Codex) => ({
  name: "Constrict",
  description:
    "The target is attacked with long, creeping tentacles, vines, or the like. This may also lower the target's Speed stat.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 35,
  attack: power(10),
  makesContact: true,
  stages: chance(1 / 10, { speed: -1 }),
}));
