import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const SelfDesctuct: Move = preload.register<Move>((C: Codex) => ({
  name: "Self-Destruct",
  description: "The user attacks everything around it by causing an explosion. The user faints upon using this move.",
  type: C.Types.Normal,
  target: "Every Adjacent",
  category: "Physical",
  pp: 5, // max 8
  attack: power(200),
  makesContact: false,
  recoil: { faint: true },
}));