import { Move } from "../index.ts";
import loader from "../loader.ts"

export const Splash: Move = loader.register<Move>(P => ({
  name: "Splash",
  description: "The user just flops and splashes around to no effect at all.",
  type: P.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
}));
