import C, { Move } from "../index.ts";

export const TakeDown: Move = {
  name: "Take Down",
  description: "A reckless, full-body charge attack for slamming into the target. This also damages the user a little.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20, // max 32
  power: 90,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
};
// TODO proportional recoil
