import C, { Move } from "../index.ts";

export const Thunder: Move = {
  name: "Thunder",
  description:
    "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Physical",
  pp: 10, // max 16
  power: 110,
  accuracy: 70,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Paralysis, 1 / 10],
};
