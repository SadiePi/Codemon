import C, { Move } from "../index.ts";

export const Crunch: Move = {
  name: "Crunch",
  description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
  stage: [{ defense: -1 }, 2 / 10],
};