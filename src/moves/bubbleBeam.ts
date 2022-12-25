import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const BubbleBeam = moves.register(() => ({
  name: "Bubble Beam",
  description: "A spray of bubbles is forcefully ejected at the target. This may also lower the target's Speed stat.",
  type: C.Types.Water,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  stages: [1 / 10, { speed: -1 }],
}));
