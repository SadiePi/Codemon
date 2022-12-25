import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const SelfDesctuct = moves.register(() => ({
  name: "Self-Destruct",
  description: "The user attacks everything around it by causing an explosion. The user faints upon using this move.",
  type: C.Types.Normal,
  target: "Every Adjacent",
  category: "Physical",
  pp: 5, // max 8
  power: 200,
  makesContact: false,
  recoil: { faint: true },
}));
