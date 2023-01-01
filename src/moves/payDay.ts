import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const PayDay: Move = preload.register<Move>((C: Codex) => ({
  name: "Pay Day",
  description: "Numerous coins are hurled at the target to inflict damage. Money is earned after the battle.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO payday
