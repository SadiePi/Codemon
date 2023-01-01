import { Codex, chance, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Twineedle: Move = preload.register<Move>((C: Codex) => ({
  name: "Twineedle",
  description:
    "The user damages the target twice in succession by jabbing it with two spikes. This may also poison the target.",
  type: C.Types.Bug,
  category: "Physical",
  pp: 20,
  attack: power(25),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(2 / 10, C.Statuses.Poison),
}));
// TODO multihit moves
