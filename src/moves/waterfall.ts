import C, { Move } from "../index.ts";

export const Waterfall: Move = {
  name: "Waterfall",
  description: "The user charges at the target and may make it flinch.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 80,
  makesContact: true,
  status: [C.Statuses.Flinch, 2 / 10],
};