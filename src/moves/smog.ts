import C, { Move } from "../index.ts";

export const Smog: Move = {
  name: "Smog",
  description: "The target is attacked with a discharge of filthy gases. This may also poison the target.",
  type: C.Types.Poison,
  target: "Any Adjacent",
  category: "Special",
  pp: 20,
  power: 30,
  accuracy: 70,
  makesContact: false,
  status: [C.Statuses.Poison, 4 / 10],
};