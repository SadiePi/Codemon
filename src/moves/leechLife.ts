import C, { Move } from "../index.ts";

export const LeechLife: Move = {
  name: "Leech Life",
  description:
    "The user drains the target's blood. The user's HP is restored by up to half the damage taken by the target.",
  type: C.Types.Bug,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 80,
  makesContact: true,
  leech: 1 / 2,
};