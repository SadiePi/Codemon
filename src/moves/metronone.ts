import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Metronone: Move = preload.register<Move>((C: Codex) => ({
  name: "Metronome",
  description: "The user waggles a finger and stimulates its brain into randomly using nearly any move.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
}));
// TODO move replacement