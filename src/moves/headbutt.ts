import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const Headbutt: Move = preload.register<Move>((C: Codex) => ({
  name: "Headbutt",
  description:
    "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(70),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(3 / 10, C.Statuses.Flinch),
}));
