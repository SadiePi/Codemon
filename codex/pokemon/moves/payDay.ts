import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const PayDay: Move = loader.register<Move>(P => ({
  name: "Pay Day",
  description: "Numerous coins are hurled at the target to inflict damage. Money is earned after the battle.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO payday
