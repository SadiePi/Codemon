import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Amnesia = moves.register(() => ({
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
