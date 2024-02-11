import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Fairy: Type = loader.register<Type>(P => ({
  name: "Fairy",
  color: 0xee99ac,
  weaknesses: [P.Types.Poison, P.Types.Steel],
  resistances: [P.Types.Fighting, P.Types.Bug, P.Types.Dark],
  immunities: [P.Types.Dragon],
}));
