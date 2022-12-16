import C, { Move } from "../index.ts";

export const Psychic: Move = {
  name: "Psychic",
  description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat.",
  type: C.Types.Psychic,
  category: "Special",
  pp: 10, // max 16
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  stage: [{ specialDefense: -1 }, 1 / 10],
};
