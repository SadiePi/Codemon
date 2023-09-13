import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Amnesia: Move = loader.register<Move>(P => ({
  name: "Amnesia",
  description:
    "The user temporarily empties its mind to forget its concerns. This sharply raises the user's Sp. Def stat.",
  type: P.Types.Psychic,
  target: { alignment: "Self" },
  category: "Status",
  pp: 20,
  makesContact: false,
  stages: { specialDefense: 2 },
}));
