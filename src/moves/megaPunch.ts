import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const MegaPunch = moves.register(() => ({
  name: "Mega Punch",
  description: "The target is slugged by a punch thrown with muscle-packed power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
}));
