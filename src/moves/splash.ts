import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Splash = moves.register(() => ({
  name: "Splash",
  description: "The user just flops and splashes around to no effect at all.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
}));
