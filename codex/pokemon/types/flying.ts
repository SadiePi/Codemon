import { Type } from "../index.ts";
import { loader } from "../loader.ts"

export const Flying: Type = loader.register<Type>(P => ({
  name: "Flying",
  color: "#A890F0",
  weaknesses: [P.Types.Rock, P.Types.Electric, P.Types.Ice],
  resistances: [P.Types.Fighting, P.Types.Bug, P.Types.Grass],
  immunities: [P.Types.Ground],
}));
