import C, { Move } from "../index.ts";
export const ThunderPunch: Move = {
  name: "Thunder Punch",
  description: "The target is punched with an electrified fist. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Physical",
  pp: 15,
  power: 75,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Paralysis, 1 / 10],
};
