import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Flash: Move = dexBuilder.register<Move>(() => ({
  name: "Flash",
  description: "The user flashes a bright light that cuts the target's accuracy.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 20,
  makesContact: false,
  stages: { accuracy: -1 },
}));
