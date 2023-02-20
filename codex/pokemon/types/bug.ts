import { Type } from "../index.ts";
import loader from "../loader.ts"

export const Bug: Type = loader.register<Type>(P => ({
  name: "Bug",
  color: "#A8B820",
  weaknesses: [P.Types.Flying, P.Types.Rock, P.Types.Fire],
  resistances: [P.Types.Fighting, P.Types.Ground, P.Types.Grass],
  immunities: [],
}));
