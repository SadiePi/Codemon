import C, { Move } from "../index.ts";

export const DreamEater: Move = {
  name: "Dream Eater",
  description:
    "The user eats the dreams of a sleeping target. The user's HP is restored by up to half the damage taken by the target.",
  type: C.Types.Psychic,
  target: "Any Adjacent",
  category: "Special",
  pp: 15,
  power: 100,
  makesContact: false,
  leech: 1 / 2,
};
// TODO effect consideration (only hit sleeping targets)