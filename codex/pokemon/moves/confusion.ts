import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Confusion: Move = loader.register<Move>(P => ({
  name: "Confusion",
  description: "The target is hit by a weak telekinetic force. This may also confuse the target.",
  type: P.Types.Psychic,
  category: "Special",
  pp: 25, // max 40
  attack: power(50),
  target: { position: "Adjacent" },
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Confusion),
}));
