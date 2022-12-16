import C, { Move } from "../index.ts";

export const Peck: Move = {
  name: "Peck",
  description: "The target is jabbed with a sharply pointed beak or horn.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  power: 35,
  target: "Any",
  makesContact: true,
};
