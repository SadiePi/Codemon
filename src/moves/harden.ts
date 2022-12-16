import C, { Move } from "../index.ts";

export const Harden: Move = {
  name: "Harden",
  description: "The user stiffens all the muscles in its body to raise its Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
  stage: { defense: 1 },
};
