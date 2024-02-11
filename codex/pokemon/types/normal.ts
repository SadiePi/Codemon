import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Normal: Type = loader.register<Type>(P => ({
  name: "Normal",
  color: 0xa8a878,
  weaknesses: [P.Types.Fighting],
  resistances: [],
  immunities: [P.Types.Ghost],
}));
