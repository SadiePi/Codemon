import { Type } from "../index.ts";
import loader from "../loader.ts"

export const Rock: Type = loader.register<Type>(P => ({
  name: "Rock",
  color: "#B8A038",
  weaknesses: [P.Types.Fighting, P.Types.Ground, P.Types.Steel, P.Types.Water, P.Types.Grass],
  resistances: [P.Types.Normal, P.Types.Flying, P.Types.Poison, P.Types.Fire],
  immunities: [],
}));
