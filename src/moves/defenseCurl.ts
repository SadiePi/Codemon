import { Codex, dexBuilder, power, Move } from "../index.ts";

export const DefenseCurl: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Defense Curl",
  description: "The user curls up to conceal weak spots and raise its Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stages: { defense: 1 },
}));
// TODO boost rollout and iceball
