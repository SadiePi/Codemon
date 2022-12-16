import C, { Move } from "../index.ts";

export const DizzyPunch: Move = {
  name: "Dizzy Punch",
  description: "The target is hit with rhythmically launched punches. This may also leave the target confused.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 70,
  makesContact: true,
  status: [C.Statuses.Confusion, 1 / 5],
};