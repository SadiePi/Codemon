import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Ice: Type = dexBuilder.register<Type>(() => ({
  name: "Ice",
  color: "#98D8D8",
  weaknesses: [C.Types.Fighting, C.Types.Rock, C.Types.Steel, C.Types.Fire],
  resistances: [C.Types.Ice],
  immunities: [],
}));
