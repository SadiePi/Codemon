import C, { Move } from "../index.ts";

export const SelfDesctuct: Move = {
  name: "Self-Destruct",
  description: "The user attacks everything around it by causing an explosion. The user faints upon using this move.",
  type: C.Types.Normal,
  target: "Every Adjacent",
  category: "Physical",
  pp: 5, // max 8
  power: 200,
  makesContact: false,
  recoil: { faint: true },
};