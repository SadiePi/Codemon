import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Scratch: Move = preload.register<Move>((C: Codex) => ({
  name: "Scratch",
  description: "Hard, pointed, sharp claws rake the target to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: true,
}));
