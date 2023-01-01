import { Codex, Codemon, Move } from "../index.ts";
import preload from "../preload.ts";

export const NightShade: Move = preload.register<Move>((C: Codex) => ({
  name: "Night Shade",
  description: "The user makes the target see a frightening mirage. It inflicts damage equal to the user's level.",
  type: C.Types.Ghost,
  category: "Special",
  pp: 15, // max 24
  target: "Any Adjacent",
  makesContact: false,
  hp: ({ action }) => (action.source instanceof Codemon ? action.source.stats.level : 0),
}));