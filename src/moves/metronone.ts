import C, { Move } from "../index.ts";

export const Metronone: Move = {
  name: "Metronome",
  description: "The user waggles a finger and stimulates its brain into randomly using nearly any move.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
};
// TODO move replacement