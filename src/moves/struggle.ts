import C, { Move } from "../index.ts";

export const Struggle: Move = {
  name: "Struggle",
  description: "This attack is used in desperation only if the user has no PP. It also damages the user a little.",
  type: C.Types.Normal,
  category: "Physical",
  target: "Any Adjacent",
  pp: 1,
  power: 50,
  makesContact: true,
  // recoil: {  },
};
// TODO struggle (pp scheme and recoil)