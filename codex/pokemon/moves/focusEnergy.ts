import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const FocusEnergy: Move = loader.register<Move>(P => ({
  name: "Focus Energy",
  description: "The user takes a deep breath and focuses so that critical hits land more easily.",
  type: P.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: { alignment: "Self" },
  makesContact: false,
}));
// TODO multiturn effects
