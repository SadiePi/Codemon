import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Bubble: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Bubble",
  description: "A spray of countless bubbles is jetted at the opposing Pokémon. This may also lower their Speed stat.",
  type: C.Types.Water,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 30,
  attack: power(40),
  makesContact: false,
  stages: [1 / 10, { speed: -1 }],
}));
