import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const HornDrill = moves.register(() => ({
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
