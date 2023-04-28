import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const DizzyPunch: Move = loader.register<Move>(P => ({
  name: "Dizzy Punch",
  description: "The target is hit with rhythmically launched punches. This may also leave the target confused.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(70),
  makesContact: true,
  status: chance(1 / 5, P.Statuses.Confusion),
}));
