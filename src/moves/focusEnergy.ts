import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const FocusEnergy: Move = preload.register<Move>((C: Codex) => ({
  name: "Focus Energy",
  description: "The user takes a deep breath and focuses so that critical hits land more easily.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
}));
// TODO multiturn effects
