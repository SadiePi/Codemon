import C, { Move } from "../index.ts";

export const Growth: Move = {
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stage: { attack: 1, specialAttack: 1 },
};
