import { Codex, power, Move, chance } from "../index.ts";
import loader from "../loader.ts";

export const Psybeam: Move = loader.register<Move>((C: Codex) => ({
  name: "Psybeam",
  description: "The target is attacked with a peculiar ray. This may also leave the target confused.",
  type: C.Types.Psychic,
  category: "Special",
  pp: 20,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, C.Statuses.Confusion),
}));
