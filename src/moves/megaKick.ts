import C, { Move } from "../index.ts";

export const MegaKick: Move = {
  name: "Mega Kick",
  description: "The target is attacked by a kick launched with muscle-packed power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 5,
  power: 120,
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
};
