import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Bug: Type = loader.register<Type>(P => ({
  name: "Bug",
  color: 0xa8b820,
  weaknesses: [P.Types.Flying, P.Types.Rock, P.Types.Fire],
  resistances: [P.Types.Fighting, P.Types.Ground, P.Types.Grass],
  immunities: [],
}));
