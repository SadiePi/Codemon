import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Agility: Move = loader.register<Move>(P => ({
  name: "Agility",
  description: "The user relaxes and lightens its body to move faster. This sharply raises the Speed stat.",
  type: P.Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  target: { alignment: "Self" },
  makesContact: false,
  stages: { speed: 2 },
}));
