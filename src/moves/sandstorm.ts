import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const Sandstorm: Move = loader.register<Move>((C: Codex) => ({
  name: "Sandstorm",
  description:
    "A five-turn sandstorm is summoned to hurt all combatants except the Rock, Ground, and Steel C.Types. It raises the Sp. Def stat of Rock C.Types.",
  type: C.Types.Rock,
  category: "Status",
  pp: 10,
  accuracy: 0,
  target: "All",
  makesContact: false,
  // weather: Weather.Sandstorm,
}));
// TODO weather
