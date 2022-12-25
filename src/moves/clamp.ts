import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Clamp = moves.register(() => ({
  name: "Clamp",
  description: "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 35,
  accuracy: 85,
  makesContact: true,
}));
// TODO multiturn moves
