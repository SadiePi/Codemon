import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const PayDay = moves.register(() => ({
  name: "Pay Day",
  description: "Numerous coins are hurled at the target to inflict damage. Money is earned after the battle.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO payday
