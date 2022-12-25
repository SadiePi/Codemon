import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Twineedle = moves.register(() => ({
  name: "Twineedle",
  description:
    "The user damages the target twice in succession by jabbing it with two spikes. This may also poison the target.",
  type: C.Types.Bug,
  category: "Physical",
  pp: 20,
  power: 25,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Poison, 2 / 10],
}));
// TODO multihit moves
