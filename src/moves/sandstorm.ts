import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Sandstorm = moves.register(() => ({
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
