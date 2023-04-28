import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const MegaPunch: Move = loader.register<Move>(P => ({
  name: "Mega Punch",
  description: "The target is slugged by a punch thrown with muscle-packed power.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(80),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
}));
