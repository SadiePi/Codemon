import C, { Move } from "../index.ts";

export const Sludge: Move = {
  name: "Sludge",
  description: "Unsanitary sludge is hurled at the target. This may also poison the target.",
  type: C.Types.Poison,
  target: "Any Adjacent",
  category: "Special",
  pp: 20,
  power: 65,
  makesContact: false,
  status: [C.Statuses.Poison, 3 / 10],
};