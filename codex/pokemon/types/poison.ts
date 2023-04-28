import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Poison: Type = loader.register<Type>(P => ({
  name: "Poison",
  color: "#A040A0",
  weaknesses: [P.Types.Ground, P.Types.Psychic],
  resistances: [P.Types.Fighting, P.Types.Poison, P.Types.Bug, P.Types.Grass, P.Types.Fairy],
  immunities: [],
}));
