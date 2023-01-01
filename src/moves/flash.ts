import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Flash: Move = preload.register<Move>((C: Codex) => ({
  name: "Flash",
  description: "The user flashes a bright light that cuts the target's accuracy.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 20,
  makesContact: false,
  stages: { accuracy: -1 },
}));
