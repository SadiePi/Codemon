import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const BubbleBeam: Move = preload.register<Move>((C: Codex) => ({
  name: "Bubble Beam",
  description: "A spray of bubbles is forcefully ejected at the target. This may also lower the target's Speed stat.",
  type: C.Types.Water,
  category: "Special",
  pp: 20,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: false,
  stages: chance(1 / 10, { speed: -1 }),
}));
