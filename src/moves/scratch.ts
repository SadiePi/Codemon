import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Scratch = moves.register(() => ({
  name: "Scratch",
  description: "Hard, pointed, sharp claws rake the target to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  power: 40,
  target: "Any Adjacent",
  makesContact: true,
}));
