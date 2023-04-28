import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Bubble: Move = loader.register<Move>(P => ({
  name: "Bubble",
  description: "A spray of countless bubbles is jetted at the opposing Pokémon. This may also lower their Speed stat.",
  type: P.Types.Water,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 30,
  attack: power(40),
  makesContact: false,
  stages: chance(1 / 10, { speed: -1 }),
}));
