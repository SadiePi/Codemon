import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Strength = moves.register(() => ({
  name: "Strength",
  description: "The target is slugged with a punch thrown at maximum power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
}));
