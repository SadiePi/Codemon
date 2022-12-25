import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Earthquake = moves.register(() => ({
  name: "Earthquake",
  description: "The user sets off an earthquake that strikes every Pokémon around it.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  target: "Every Adjacent",
  makesContact: false,
}));
