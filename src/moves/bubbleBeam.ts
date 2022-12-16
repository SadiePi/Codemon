import C, { Move } from "../index.ts";

export const BubbleBeam: Move = {
  name: "Bubble Beam",
  description: "A spray of bubbles is forcefully ejected at the target. This may also lower the target's Speed stat.",
  type: C.Types.Water,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  stage: [{ speed: -1 }, 1 / 10],
};
