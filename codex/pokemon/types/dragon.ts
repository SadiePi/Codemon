import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Dragon: Type = loader.register<Type>(P => ({
  name: "Dragon",
  color: 0x7038f8,
  weaknesses: [P.Types.Ice, P.Types.Dragon, P.Types.Fairy],
  resistances: [P.Types.Fire, P.Types.Water, P.Types.Grass, P.Types.Electric],
  immunities: [],
}));
