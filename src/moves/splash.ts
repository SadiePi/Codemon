import { Codex, dexBuilder, Move } from "../index.ts";

export const Splash: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Splash",
  description: "The user just flops and splashes around to no effect at all.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
}));
