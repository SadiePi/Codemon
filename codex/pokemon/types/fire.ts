import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Fire: Type = loader.register<Type>(P => ({
  name: "Fire",
  color: 0xf08030,
  weaknesses: [P.Types.Ground, P.Types.Rock, P.Types.Water],
  resistances: [P.Types.Bug, P.Types.Steel, P.Types.Fire, P.Types.Grass, P.Types.Ice, P.Types.Fairy],
  immunities: [],
}));
