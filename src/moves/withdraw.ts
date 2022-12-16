import C, { Move } from "../index.ts";

export const Withdraw: Move = {
  name: "Withdraw",
  description: "The user withdraws its body into its hard shell, raising its Defense stat.",
  type: C.Types.Water,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stage: { defense: 1 },
};