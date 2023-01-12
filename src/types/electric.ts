import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Electric: Type = loader.register<Type>((C: Codex) => ({
  name: "Electric",
  color: "#F8D030",
  weaknesses: [C.Types.Ground],
  resistances: [C.Types.Flying, C.Types.Steel, C.Types.Electric],
  immunities: [],
}));
