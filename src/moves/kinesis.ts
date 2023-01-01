import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Kinesis: Move = dexBuilder.register<Move>(() => ({
  name: "Kinesis",
  description: "The user distracts the target by bending a spoon. This lowers the target's accuracy.",
  type: C.Types.Psychic,
  target: "Any Adjacent",
  category: "Status",
  pp: 15,
  accuracy: 80,
  makesContact: false,
  stages: { accuracy: -1 },
}));
