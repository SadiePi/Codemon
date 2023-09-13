import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const StringShot: Move = loader.register<Move>(P => ({
  name: "String Shot",
  description: "Opposing Pokémon are bound with silk blown from the user's mouth that harshly lowers the Speed stat.",
  type: P.Types.Bug,
  category: "Status",
  pp: 40, // max 64
  accuracy: 95,
  target: { quantity: "All", position: "Adjacent", alignment: "Foe" },
  makesContact: false,
  stages: { speed: -2 },
}));
