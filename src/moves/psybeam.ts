import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Psybeam = moves.register(() => ({
  name: "Psybeam",
  description: "The target is attacked with a peculiar ray. This may also leave the target confused.",
  type: C.Types.Psychic,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Confusion, 1 / 10],
}));
