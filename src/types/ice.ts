import { Codex, dexBuilder, Type } from "../index.ts";

export const Ice: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Ice",
  color: "#98D8D8",
  weaknesses: [C.Types.Fighting, C.Types.Rock, C.Types.Steel, C.Types.Fire],
  resistances: [C.Types.Ice],
  immunities: [],
}));
