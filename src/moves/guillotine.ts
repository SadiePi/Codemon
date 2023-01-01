import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Guillotine: Move = preload.register<Move>((C: Codex) => ({
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
