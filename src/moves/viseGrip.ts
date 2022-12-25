import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const ViseGrip = moves.register(() => ({
  name: "Vise Grip",
  description: "The target is gripped and squeezed from both sides to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  power: 55,
  target: "Any Adjacent",
  makesContact: true,
}));
