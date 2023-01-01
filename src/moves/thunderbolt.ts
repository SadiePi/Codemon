import { Codex, chance, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Thunderbolt: Move = preload.register<Move>((C: Codex) => ({
  name: "Thunderbolt",
  description: "A strong electric blast crashes down on the target. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Special",
  pp: 15, // max 24
  attack: power(90),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, C.Statuses.Paralysis),
}));