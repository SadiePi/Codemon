import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Flash: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Flash",
  description: "The user flashes a bright light that cuts the target's accuracy.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 20,
  makesContact: false,
  stages: { accuracy: -1 },
}));
