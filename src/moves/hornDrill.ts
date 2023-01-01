import { Codex, dexBuilder, power, Move } from "../index.ts";

export const HornDrill: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Horn Drill",
  description:
    "The user stabs the target with a horn that rotates like a drill. The target faints instantly if this attack hits.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 5,
  target: "Any Adjacent",
  makesContact: true,
  faint: true,
}));
