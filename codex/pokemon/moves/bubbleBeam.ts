import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const BubbleBeam: Move = loader.register<Move>(P => ({
  name: "Bubble Beam",
  description: "A spray of bubbles is forcefully ejected at the target. This may also lower the target's Speed stat.",
  type: P.Types.Water,
  category: "Special",
  pp: 20,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: false,
  stages: chance(1 / 10, { speed: -1 }),
}));
