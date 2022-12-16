import C, { Move } from "../index.ts";

export const Gust: Move = {
  name: "Gust",
  description: "A gust of wind is whipped up by wings and launched at the target to inflict damage.",
  type: C.Types.Flying,
  category: "Special",
  pp: 35,
  power: 40,
  target: "Any",
  makesContact: false,
};
// TODO during Fly, double power
