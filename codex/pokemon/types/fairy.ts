import { Type } from "../index.ts";
import loader from "../loader.ts"

export const Fairy: Type = loader.register<Type>(P => ({
  name: "Fairy",
  color: "#EE99AC",
  weaknesses: [P.Types.Poison, P.Types.Steel],
  resistances: [P.Types.Fighting, P.Types.Bug, P.Types.Dark],
  immunities: [P.Types.Dragon],
}));
