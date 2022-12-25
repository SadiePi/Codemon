import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Harden = moves.register(() => ({
  name: "Harden",
  description: "The user stiffens all the muscles in its body to raise its Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
  stages: { defense: 1 },
}));
