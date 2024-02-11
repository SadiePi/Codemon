import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Grass: Type = loader.register<Type>(P => ({
  name: "Grass",
  color: 0x78c850,
  weaknesses: [P.Types.Flying, P.Types.Poison, P.Types.Bug, P.Types.Fire, P.Types.Ice],
  resistances: [P.Types.Ground, P.Types.Water, P.Types.Grass, P.Types.Electric],
  immunities: [],
}));
