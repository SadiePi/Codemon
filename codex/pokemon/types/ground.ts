import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Ground: Type = loader.register<Type>(P => ({
  name: "Ground",
  color: 0xe0c068,
  weaknesses: [P.Types.Water, P.Types.Grass, P.Types.Ice],
  resistances: [P.Types.Poison, P.Types.Rock],
  immunities: [P.Types.Electric],
}));
