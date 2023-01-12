import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Ice: Type = loader.register<Type>((C: Codex) => ({
  name: "Ice",
  color: "#98D8D8",
  weaknesses: [C.Types.Fighting, C.Types.Rock, C.Types.Steel, C.Types.Fire],
  resistances: [C.Types.Ice],
  immunities: [],
}));
