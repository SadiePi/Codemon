import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Psychic: Move = loader.register<Move>(P => ({
  name: "Psychic",
  description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat.",
  type: P.Types.Psychic,
  category: "Special",
  pp: 10, // max 16
  attack: power(90),
  target: { position: "Adjacent" },
  makesContact: false,
  stages: chance(1 / 10, { specialDefense: -1 }),
}));
