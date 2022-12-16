import C, { Move } from "../index.ts";

export const Spore: Move = {
  name: "Spore",
  description: "The user scatters bursts of spores that induce sleep.",
  type: C.Types.Grass,
  target: "Any Adjacent",
  category: "Status",
  pp: 15,
  makesContact: false,
  status: C.Statuses.Sleep,
};
// TODO type consideration (miss grass types)