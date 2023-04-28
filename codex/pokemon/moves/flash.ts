import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Flash: Move = loader.register<Move>(P => ({
  name: "Flash",
  description: "The user flashes a bright light that cuts the target's accuracy.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 20,
  makesContact: false,
  stages: { accuracy: -1 },
}));
