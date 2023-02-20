import { Type } from "../index.ts";
import loader from "../loader.ts"

export const Psychic: Type = loader.register<Type>(P => ({
  name: "Psychic",
  color: "#F85888",
  weaknesses: [P.Types.Bug, P.Types.Ghost, P.Types.Dark],
  resistances: [P.Types.Fighting, P.Types.Psychic],
  immunities: [],
}));
