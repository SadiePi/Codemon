import C, { Move } from "../index.ts";

export const TriAttack: Move = {
  name: "Tri Attack",
  description:
    "The user strikes with a simultaneous three-beam attack. This may also burn, freeze, or paralyze the target.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Special",
  pp: 10,
  power: 80,
  makesContact: false,
  // status: [
  //   [C.Statuses.Burn, 1 / 5],
  //   [C.Statuses.Freeze, 1 / 5],
  //   [C.Statuses.Paralyze, 1 / 5],
  // ],
};
// TODO triattack