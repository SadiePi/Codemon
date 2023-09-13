import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Constrict: Move = loader.register<Move>(P => ({
  name: "Constrict",
  description:
    "The target is attacked with long, creeping tentacles, vines, or the like. This may also lower the target's Speed stat.",
  type: P.Types.Normal,
  target: { position: "Adjacent" },
  category: "Physical",
  pp: 35,
  attack: power(10),
  makesContact: true,
  stages: chance(1 / 10, { speed: -1 }),
}));
