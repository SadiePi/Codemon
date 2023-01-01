import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Electric: Type = preload.register<Type>((C: Codex) => ({
  name: "Electric",
  color: "#F8D030",
  weaknesses: [C.Types.Ground],
  resistances: [C.Types.Flying, C.Types.Steel, C.Types.Electric],
  immunities: [],
}));
