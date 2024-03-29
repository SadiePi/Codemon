import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Bide: Move = loader.register<Move>(P => ({
  name: "Bide",
  description: "The user endures attacks for two turns, then strikes back to cause double the damage taken.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 10, // max 16
  priority: 1,
  target: { alignment: "Self" },
  makesContact: true,
}));
// TODO bide effect
