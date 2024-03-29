import { Codemon, Move } from "../mod.ts";
import loader from "../loader.ts";

export const NightShade: Move = loader.register<Move>(P => ({
  name: "Night Shade",
  description: "The user makes the target see a frightening mirage. It inflicts damage equal to the user's level.",
  type: P.Types.Ghost,
  category: "Special",
  pp: 15, // max 24
  target: { position: "Adjacent" },
  makesContact: false,
  hp: ({ action }) => action.params.user.stats.level,
}));
