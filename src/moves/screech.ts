import C, { Move } from "../index.ts";

// why isn't this a status move apdabiouaboduiboiuafb
export const Screech: Move = {
  name: "Screech",
  description: "An earsplitting screech harshly lowers the target's Defense stat.",
  type: C.Types.Normal,
  category: "Special",
  pp: 40, // max 64
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
  stage: { defense: -2 },
};
