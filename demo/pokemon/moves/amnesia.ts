import { Codex, Move, power, register } from "../index.ts";

export const Amnesia: Move = register<Move>((C: Codex) => ({
  name: "Amnesia",
  description:
    "The user temporarily empties its mind to forget its concerns. This sharply raises the user's Sp. Def stat.",
  type: C.Types.Psychic,
  target: "Self",
  category: "Status",
  pp: 20,
  makesContact: false,
  stages: { specialDefense: 2 },
}));
