import { Codex, dexBuilder, power, Move } from "../index.ts";

export const FocusEnergy: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Focus Energy",
  description: "The user takes a deep breath and focuses so that critical hits land more easily.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
}));
// TODO multiturn effects
