import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Water: Type = loader.register<Type>(P => ({
  name: "Water",
  color: 0x6890f0,
  weaknesses: [P.Types.Grass, P.Types.Electric],
  resistances: [P.Types.Steel, P.Types.Fire, P.Types.Water, P.Types.Ice],
  immunities: [],
}));
