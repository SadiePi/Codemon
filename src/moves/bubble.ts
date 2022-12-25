import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Bubble = moves.register(() => ({
  name: "Bubble",
  description: "A spray of countless bubbles is jetted at the opposing Pokémon. This may also lower their Speed stat.",
  type: C.Types.Water,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 30,
  power: 40,
  makesContact: false,
  stages: [1 / 10, { speed: -1 }],
}));
