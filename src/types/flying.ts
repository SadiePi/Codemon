import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Flying: Type = loader.register<Type>((C: Codex) => ({
  name: "Flying",
  color: "#A890F0",
  weaknesses: [C.Types.Rock, C.Types.Electric, C.Types.Ice],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Grass],
  immunities: [C.Types.Ground],
}));
