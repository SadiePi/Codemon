import C, { Move } from "../index.ts";

export const Lick: Move = {
  name: "Lick",
  description: "The target is licked with a long tongue, causing damage. It may also leave the target with paralysis.",
  type: C.Types.Ghost,
  target: "Any Adjacent",
  category: "Physical",
  pp: 30,
  power: 30,
  makesContact: true,
  status: [C.Statuses.Paralysis, 3 / 10],
};