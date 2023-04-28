import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Ice: Type = loader.register<Type>(P => ({
  name: "Ice",
  color: "#98D8D8",
  weaknesses: [P.Types.Fighting, P.Types.Rock, P.Types.Steel, P.Types.Fire],
  resistances: [P.Types.Ice],
  immunities: [],
}));
