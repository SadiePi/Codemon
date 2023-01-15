import { Type } from "../index.ts";
import { loader } from "../loader.ts"

export const Electric: Type = loader.register<Type>(P => ({
  name: "Electric",
  color: "#F8D030",
  weaknesses: [P.Types.Ground],
  resistances: [P.Types.Flying, P.Types.Steel, P.Types.Electric],
  immunities: [],
}));
