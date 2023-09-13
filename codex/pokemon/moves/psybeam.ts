import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Psybeam: Move = loader.register<Move>(P => ({
  name: "Psybeam",
  description: "The target is attacked with a peculiar ray. This may also leave the target confused.",
  type: P.Types.Psychic,
  category: "Special",
  pp: 20,
  attack: power(65),
  target: { position: "Adjacent" },
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Confusion),
}));
