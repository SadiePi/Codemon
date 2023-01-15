import { Type } from "../index.ts";
import { loader } from "../loader.ts"

export const Normal: Type = loader.register<Type>(P => ({
  name: "Normal",
  color: "#A8A878",
  weaknesses: [P.Types.Fighting],
  resistances: [],
  immunities: [P.Types.Ghost],
}));
