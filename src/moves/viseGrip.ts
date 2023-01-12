import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const ViseGrip: Move = loader.register<Move>((C: Codex) => ({
  name: "Vise Grip",
  description: "The target is gripped and squeezed from both sides to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  attack: power(55),
  target: "Any Adjacent",
  makesContact: true,
}));
