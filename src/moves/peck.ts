import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Peck = moves.register(() => ({
  name: "Peck",
  description: "The target is jabbed with a sharply pointed beak or horn.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  power: 35,
  target: "Any",
  makesContact: true,
}));
