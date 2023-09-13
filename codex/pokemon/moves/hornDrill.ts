import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const HornDrill: Move = loader.register<Move>(P => ({
  name: "Horn Drill",
  description:
    "The user stabs the target with a horn that rotates like a drill. The target faints instantly if this attack hits.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 5,
  target: { position: "Adjacent" },
  makesContact: true,
  faint: true,
}));
