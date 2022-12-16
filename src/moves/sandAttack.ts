import C, { Move } from "../index.ts";

export const SandAttack: Move = {
  name: "Sand Attack",
  description: "Sand is hurled in the target's face, reducing the target's accuracy.",
  type: C.Types.Ground,
  category: "Status",
  pp: 15,
  target: "Any Adjacent",
  makesContact: false,
  stage: { accuracy: -1 },
};
