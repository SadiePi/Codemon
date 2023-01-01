import { chance, Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const BodySlam: Move = preload.register<Move>((C: Codex) => ({
  name: "Body Slam",
  description:
    "The user drops onto the target with its full body weight. This may also leave the target with paralysis.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(85),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(3 / 10, C.Statuses.Paralysis),
}));
