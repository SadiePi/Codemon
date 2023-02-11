import { Type } from "../index.ts";
import { loader } from "../loader.ts"

export const Fire: Type = loader.register<Type>(P => ({
  name: "Fire",
  color: "#F08030",
  weaknesses: [P.Types.Ground, P.Types.Rock, P.Types.Water],
  resistances: [P.Types.Bug, P.Types.Steel, P.Types.Fire, P.Types.Grass, P.Types.Ice, P.Types.Fairy],
  immunities: [],
}));