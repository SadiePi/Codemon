import C, { Move } from "../index.ts";

export const DefenseCurl: Move = {
  name: "Defense Curl",
  description: "The user curls up to conceal weak spots and raise its Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stage: { defense: 1 },
};
// TODO boost rollout and iceball