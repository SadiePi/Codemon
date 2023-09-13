import { power, Move } from "../index.ts";
import loader from "../loader.ts";

export const SelfDesctuct: Move = loader.register<Move>(P => ({
  name: "Self-Destruct",
  description: "The user attacks everything around it by causing an explosion. The user faints upon using this move.",
  type: P.Types.Normal,
  target: { quantity: "All", position: "Adjacent" },
  category: "Physical",
  pp: 5, // max 8
  attack: power(200),
  makesContact: false,
  recoil: { faint: true },
}));
