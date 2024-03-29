import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Electric: Type = loader.register<Type>(P => ({
  name: "Electric",
  color: 0xf8d030,
  weaknesses: [P.Types.Ground],
  resistances: [P.Types.Flying, P.Types.Steel, P.Types.Electric],
  immunities: [],
}));
