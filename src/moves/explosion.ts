import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Explosion = moves.register(() => ({
  name: "Explosion",
  description:
    "The user attacks everything around it by causing a tremendous explosion. The user faints upon using this move.",
  type: C.Types.Normal,
  target: "Every Adjacent",
  category: "Physical",
  pp: 5,
  power: 250,
  makesContact: false,
  recoil: { faint: true },
}));
