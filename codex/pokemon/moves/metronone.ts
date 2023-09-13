import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Metronone: Move = loader.register<Move>(P => ({
  name: "Metronome",
  description: "The user waggles a finger and stimulates its brain into randomly using nearly any move.",
  type: P.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: { alignment: "Self" },
  makesContact: false,
}));
// TODO move replacement
