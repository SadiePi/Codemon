import { Codex, power, Move, register } from "../index.ts";

export const Hypnosis: Move = register<Move>((C: Codex) => ({
  name: "Hypnosis",
  description: "The user employs hypnotic suggestion to make the target fall into a deep sleep.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  accuracy: 60,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Sleep,
}));
