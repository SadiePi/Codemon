import C, { Move } from "../index.ts";

export const Bubble: Move = {
  name: "Bubble",
  description: "A spray of countless bubbles is jetted at the opposing Pokémon. This may also lower their Speed stat.",
  type: C.Types.Water,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 30,
  power: 40,
  makesContact: false,
  stage: [{ speed: -1 }, 1 / 10],
};