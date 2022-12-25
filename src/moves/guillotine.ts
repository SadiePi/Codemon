import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Guillotine = moves.register(() => ({
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
