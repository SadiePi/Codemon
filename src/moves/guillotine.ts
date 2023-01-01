import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Guillotine: Move = dexBuilder.register<Move>(() => ({
  name: "Guillotine",
  description: "A vicious, tearing attack with big pincers. The target faints instantly if this attack hits.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 5,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
  faint: true,
}));
